using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RemontoDarbuSistema_Backend.Models;

namespace RemontoDarbuSistema_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserReservationsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UserReservationsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/UserReservations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserReservation>>> GetUserReservation()
        {
            return await _context.UserReservation.ToListAsync();
        }
        [HttpGet("{email}/getReservationsByEmail")]
        public async Task<ActionResult<IEnumerable<UserReservation>>> GetUserReservationsByEmail(string email)
        {
            var list = await _context.UserReservation.Where(x => x.Email == email).ToListAsync();
          
            return list;
        }
        [HttpGet("{email}/getServiceReservationsByEmail")]
        public async Task<ActionResult<IEnumerable<UserReservation>>> GetUserReservationsByServiceId(string email)
        {
            var services = await _context.Service.Where(x => x.UserEmail == email).ToListAsync();
            var service = services.FirstOrDefault();
            
            if (service != null)
            {
                var serviceReservations = await _context.UserReservation.Where(x => x.ServiceName == service.Name).ToListAsync();
                return serviceReservations;
            }
            return new List<UserReservation>();
        }

        // GET: api/UserReservations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserReservation>> GetUserReservation(int id)
        {
            var userReservation = await _context.UserReservation.FindAsync(id);

            if (userReservation == null)
            {
                return NotFound();
            }

            return userReservation;
        }

        // PUT: api/UserReservations/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUserReservation(int id, UserReservation userReservation)
        {
            if (id != userReservation.Id)
            {
                return BadRequest();
            }

            _context.Entry(userReservation).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserReservationExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(new { id = userReservation.Id });
        }

        // POST: api/UserReservations
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<UserReservation>> PostUserReservation(UserReservation userReservation)
        {
            _context.UserReservation.Add(userReservation);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUserReservation", new { id = userReservation.Id }, userReservation);
        }

        // DELETE: api/UserReservations/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUserReservation(int id)
        {
            var userReservation = await _context.UserReservation.FindAsync(id);
            if (userReservation == null)
            {
                return NotFound();
            }

            _context.UserReservation.Remove(userReservation);
            await _context.SaveChangesAsync();

            return Ok(new { id = userReservation.Id });
        }

        private bool UserReservationExists(int id)
        {
            return _context.UserReservation.Any(e => e.Id == id);
        }
    }
}
