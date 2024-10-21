using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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

        [HttpGet("{userId}")]
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
    }
}
