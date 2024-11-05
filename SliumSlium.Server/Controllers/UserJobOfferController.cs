using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SliumSlium.Server.DTO;
using SliumSlium.Server.Models;

namespace SliumSlium.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserJobOfferController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public UserJobOfferController(DatabaseContext context)
        {
            _context = context;
        }

        [HttpGet("user={userId}")]
        public async Task<ActionResult<IEnumerable<UserJobOffer>>> GetUserJobOffers(int userId)
        {
            var userJobOffers = await _context.UserJobOffer
                .Include(u => u.JobOffer)
                .Where(u => u.Fk_Userid_User == userId)
                .ToListAsync();

            if (userJobOffers == null)
            {
                return NotFound(new { Message = "No job offers found for this user." });
            }

            return Ok(userJobOffers);
        }

        [HttpGet("{userId}/{jobOfferId}")]
        public async Task<ActionResult<UserJobOffer?>> GetUserJobOffer(int userId, int jobOfferId)
        {
            var userJobOffer = await _context.UserJobOffer
                .Include(u => u.JobOffer)
                .FirstOrDefaultAsync(u => u.Fk_Userid_User == userId && u.Fk_JobOfferid_JobOffer == jobOfferId);

            return Ok(userJobOffer);
        }

        [HttpPost]
        public async Task<IActionResult> CreateUserJobOffer([FromBody] CreateUserJobOfferDTO userJobOfferDTO)
        {
            var userJobOffer = new UserJobOffer
            {
                Fk_JobOfferid_JobOffer = userJobOfferDTO.Fk_JobOfferid_JobOffer,
                Fk_Userid_User = userJobOfferDTO.Fk_Userid_User,
                ApplicationDate = DateTime.Now,
                CurrentPart = 1,
                Status = "Submitted"
            };

            try
            {
                _context.UserJobOffer.Add(userJobOffer);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetUserJobOfferById), new { id = userJobOffer.Id_UserJobOffer }, userJobOffer);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserJobOffer>> GetUserJobOfferById(int id)
        {
            var userJobOffer = await _context.UserJobOffer.FindAsync(id);

            if (userJobOffer == null)
            {
                return NotFound();
            }

            return userJobOffer;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUserJobOffer(int id, [FromBody] UpdateUserJobOfferDTO userJobOfferDTO)
        {
            var userJobOffer = await _context.UserJobOffer.FindAsync(id);

            if (userJobOffer == null)
            {
                return NotFound(new { Message = "User job offer not found." });
            }

            try
            {
                userJobOffer.Status = userJobOfferDTO.Status;
                userJobOffer.CurrentPart = userJobOfferDTO.CurrentPart;
                await _context.SaveChangesAsync();
                return Ok(new { Message = "Updated" });
            }
            catch (DbUpdateException ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }
    }
}
