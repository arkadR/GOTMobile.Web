using System.Collections.Generic;
using System.Linq;
using GOTMobile.Web.Models;
using Microsoft.AspNetCore.Mvc;

namespace GOTMobile.Web.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class SegmentsController : ControllerBase
  {
    private readonly GOTMobileContext _gotMobileContext;

    public SegmentsController(GOTMobileContext gotMobileContext)
    {
      _gotMobileContext = gotMobileContext;
    }

    [HttpGet]
    public ICollection<Segment> GetAllSegments()
    {
      return _gotMobileContext.Segment.ToList();
    }

    [HttpGet("{id}")]
    public IActionResult GetSegmentById(int id)
    {
      var segment = _gotMobileContext.Segment.SingleOrDefault(seg => seg.Id == id);
      if (segment == null)
        return NotFound($"No segment with id {id}.");
      return Ok(segment);
    }

    [HttpPost]
    public IActionResult PostSegment([FromBody] Segment segment)
    {
      var res = _gotMobileContext.Segment.SingleOrDefault(seg => seg.Id == segment.Id);
      if (res != null)
        _gotMobileContext.Segment.Remove(res);
      _gotMobileContext.Segment.Add(segment);
      _gotMobileContext.SaveChanges();
      return Ok();
    }

    [HttpDelete("{id}")]
    public ActionResult DeleteSegment(int id)
    {
      var found = _gotMobileContext.Segment.SingleOrDefault(seg => seg.Id == id);
      if (found == null)
        return BadRequest($"No segment with id {id} found");

      _gotMobileContext.Segment.Remove(found);
      _gotMobileContext.SaveChanges();
      return Ok();
    }
  }
}