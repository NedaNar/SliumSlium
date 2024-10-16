﻿using Microsoft.AspNetCore.Mvc;
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
