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
    public class PageReviewsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PageReviewsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/PageReviews
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PageReview>>> GetPageReview()
        {
            return await _context.PageReview.ToListAsync();
        }

        // GET: api/PageReviews/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PageReview>> GetPageReview(int id)
        {
            var pageReview = await _context.PageReview.FindAsync(id);

            if (pageReview == null)
            {
                return NotFound();
            }

            return pageReview;
        }

        // PUT: api/PageReviews/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPageReview(int id, PageReview pageReview)
        {
            if (id != pageReview.Id)
            {
                return BadRequest();
            }

            _context.Entry(pageReview).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PageReviewExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/PageReviews
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<PageReview>> PostPageReview(PageReview pageReview)
        {
            _context.PageReview.Add(pageReview);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPageReview", new { id = pageReview.Id }, pageReview);
        }

        // DELETE: api/PageReviews/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePageReview(int id)
        {
            var pageReview = await _context.PageReview.FindAsync(id);
            if (pageReview == null)
            {
                return NotFound();
            }

            _context.PageReview.Remove(pageReview);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PageReviewExists(int id)
        {
            return _context.PageReview.Any(e => e.Id == id);
        }
    }
}
