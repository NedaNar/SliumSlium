using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SliumSlium.Server.Models;
using SliumSlium.Server.DTO;
using SliumSlium.Server.Services;

namespace SliumSlium.Server.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly JwtService _jwtService;
        private readonly DatabaseContext _context;

        public UserController(DatabaseContext PVPContext, JwtService jwtService)
        {
            _context = PVPContext;
            _jwtService = jwtService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.User.ToListAsync();
        }

        // Get user by ID
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            if (_context.User == null)
            {
                return NotFound();
            }

            var user = await _context.User.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            try
            {
                var existingUser = await _context.User
                    .FirstOrDefaultAsync(u => u.Email == user.Email);

                if (existingUser != null)
                {
                    return Conflict(new { message = "Email already exists." });
                }

                user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);

                _context.User.Add(user);
                await _context.SaveChangesAsync();

                var jwt = _jwtService.Generate(user.Id_User);

                var cookieOptions = new CookieOptions
                {
                    HttpOnly = true,
                    Expires = DateTime.UtcNow.AddDays(7),
                    SameSite = SameSiteMode.Strict,
                    Secure = true
                };

                Response.Cookies.Append("jwt", jwt, cookieOptions);

                return Ok(new { Message = "Success" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        [HttpPost("login")]
        public ActionResult Login(LoginDTO loginDto)
        {
            var user = _context.User.FirstOrDefault(u => u.Email == loginDto.email);

            if (user == null)
                return BadRequest(new { Message = "Invalid email or password" });

            bool passwordMatch = BCrypt.Net.BCrypt.Verify(loginDto.password, user.Password);

            if (!passwordMatch)
                return BadRequest(new { Message = "Invalid email or password" });

            var jwt = _jwtService.Generate(user.Id_User);

            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Expires = DateTime.UtcNow.AddDays(7),
                SameSite = SameSiteMode.Strict,
                Secure = true
            };

            Response.Cookies.Append("jwt", jwt, cookieOptions);

            return Ok(new { Message = "Success" });
        }

        [HttpGet("User")]
        public ActionResult<User> GetAuthenticatedUser()
        {
            try
            {
                var jwt = Request.Cookies["jwt"];

                if (string.IsNullOrEmpty(jwt))
                    return NoContent();

                var token = _jwtService.Verify(jwt);
                int userId = int.Parse(token.Issuer);
                var user = _context.User.FirstOrDefault(u => u.Id_User == userId);

                if (user == null)
                    return NotFound(new { Message = "User not found" });

                return Ok(user);
            }
            catch (Exception ex)
            {
                return Unauthorized(new { Message = $"Error: {ex.Message}" });
            }
        }

        [HttpPost("logout")]
        public ActionResult Logout()
        {
            Response.Cookies.Delete("jwt");
            return Ok(new { Message = "Logout successful" });
        }
    }
}