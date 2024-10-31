using CloudinaryDotNet;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SliumSlium.Server.DTO;
using SliumSlium.Server.Models;

namespace SliumSlium.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileUploadController : ControllerBase
    {
        private readonly Cloudinary _cloudinary;
        private readonly DatabaseContext _context;

        public FileUploadController(IConfiguration config, DatabaseContext context)
        {
            var cloudName = config["Cloudinary:CloudName"];
            var apiKey = config["Cloudinary:ApiKey"];
            var apiSecret = config["Cloudinary:ApiSecret"];
            
            _cloudinary = new Cloudinary(new Account(cloudName, apiKey, apiSecret));
            _context = context;
        }

        [HttpGet("cloudinary-signature")]
        public IActionResult GetCloudinarySignature()
        {
            var timestamp = ((DateTimeOffset)DateTime.UtcNow).ToUnixTimeSeconds();

            var parameters = new SortedDictionary<string, object>
            {
                { "timestamp", timestamp }
            };

            var signature = _cloudinary.Api.SignParameters(parameters);

            return Ok(new { signature, timestamp });
        }

        [HttpPost("upload")]
        public async Task<IActionResult> UploadFile([FromBody] FileUploadDto fileUploadDto)
        {
            if (string.IsNullOrEmpty(fileUploadDto.FilePath))
            {
                return BadRequest("File path is required.");
            }

            var fileEntity = new Upload
            {
                FilePath = fileUploadDto.FilePath,
                PartId = fileUploadDto.PartId,
                UserId = fileUploadDto.UserId
            };

            _context.Upload.Add(fileEntity);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetFileByUserIdAndPartId), new { userId = fileEntity.UserId, partId = fileEntity.PartId }, fileEntity);
        }

        [HttpGet("{userId}&{partId}")]
        public async Task<IActionResult> GetFileByUserIdAndPartId(int userId, int partId)
        {
            var fileEntity = await _context.Upload.FirstOrDefaultAsync(f => f.UserId == userId && f.PartId == partId);

            if (fileEntity == null)
            {
                return Ok(null);
            }

            return Ok(fileEntity);
        }
    }
}
