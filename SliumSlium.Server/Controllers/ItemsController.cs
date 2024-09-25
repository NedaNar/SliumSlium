using Microsoft.AspNetCore.Mvc;
using SliumSlium.Models;

namespace SliumSlium.Controllers
{
    // TODO Update with our items

    [ApiController]
    [Route("api/[controller]")]
    public class ItemsController : ControllerBase
    {
        private readonly ILogger<ItemsController> _logger;
        private readonly DatabaseContext _context;

        public ItemsController(ILogger<ItemsController> logger, DatabaseContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet(Name = "GetItems")]
        public ActionResult<IEnumerable<Item>> Get()
        {
            return _context.Items.ToList();
        }
    }
}