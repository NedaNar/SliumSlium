using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SliumSlium.Server.Models;

namespace SliumSlium.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobOfferController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public JobOfferController(DatabaseContext context)
        {
            _context = context;
        }

        [HttpGet("Query")]
        public async Task<ActionResult<IEnumerable<JobOffer>>> GetJobOffers([FromQuery] string? Name, [FromQuery] string? Location, [FromQuery] string? CompanyName,
            [FromQuery] int? ExperienceLevel, [FromQuery] int? WorkEnvironment, [FromQuery] bool? PartTime)
        {
            var query = _context.JobOffer.AsQueryable();

            try
            {
                if (!string.IsNullOrEmpty(Name))
                {
                    query = query.Where(j => j.Name.ToLower().Contains(Name.ToLower()));
                }

                if (!string.IsNullOrEmpty(Name))
                {
                    query = query.Where(j => j.Description.ToLower().Contains(Name.ToLower()));
                }

                if (!string.IsNullOrEmpty(Location))
                {
                    query = query.Where(j => j.Location.ToLower().Contains(Location.ToLower()));
                }

                if (!string.IsNullOrEmpty(CompanyName))
                {
                    query = query.Where(j => j.CompanyName.ToLower().Contains(CompanyName.ToLower()));
                }

                if (ExperienceLevel.HasValue)
                {
                    query = query.Where(j => j.ExperienceLevel == ExperienceLevel.Value);
                }

                if (WorkEnvironment.HasValue)
                {
                    query = query.Where(j => j.WorkEnvironment == WorkEnvironment.Value);
                }

                if (PartTime.HasValue)
                {
                    query = query.Where(j => j.PartTime == PartTime.Value);
                }

                return await query.ToListAsync();
            }
            catch (Exception exception)
            {
                return StatusCode(500, new { error = exception.Message });
            }
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<JobOffer>>> GetJobOffers()
        {
            var jobOffers = await _context.JobOffer
                .Include(j => j.Parts)
                .ToListAsync();

            return Ok(jobOffers);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<JobOffer>> GetJobOffer(int id)
        {
            var jobOffer = await _context.JobOffer
                .Include(j => j.Parts)
                .FirstOrDefaultAsync(j => j.Id_JobOffer == id);

            if (jobOffer == null)
            {
                return NotFound();
            }

            return Ok(jobOffer);
        }


        [HttpGet("{id}/parts")]
        public async Task<ActionResult<IEnumerable<Part>>> GetPartsByJobOfferId(int id)
        {
            var jobOffer = await _context.JobOffer
                .Include(j => j.Parts)
                .FirstOrDefaultAsync(j => j.Id_JobOffer == id);

            if (jobOffer == null)
            {
                return NotFound();
            }

            return Ok(jobOffer.Parts);
        }

        [HttpGet("locations")]
        public async Task<ActionResult<IEnumerable<string>>> GetAllLocations()
        {
            var locations = await _context.JobOffer
                .Select(j => j.Location)
                .Distinct()
                .ToListAsync();

            return Ok(locations);
        }

        [HttpGet("companies")]
        public async Task<ActionResult<IEnumerable<string>>> GetAllCompanies()
        {
            var companies = await _context.JobOffer
                .Select(j => j.CompanyName)
                .Distinct()
                .ToListAsync();

            return Ok(companies);
        }
    }
}
