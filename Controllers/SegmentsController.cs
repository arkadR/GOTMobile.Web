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
    private static readonly List<Segment> _segments = new List<Segment>
    {
      new Segment {Id = 1, StartingPointId = 1, EndingPointId = 2, Length = 12, Points = 5, PointsBack = 6},
      new Segment {Id = 2, StartingPointId = 1, EndingPointId = 3, Length = 13, Points = 5, PointsBack = 6},
      new Segment {Id = 3, StartingPointId = 1, EndingPointId = 4, Length = 14, Points = 5, PointsBack = 6},
      new Segment {Id = 4, StartingPointId = 2, EndingPointId = 3, Length = 23, Points = 5, PointsBack = 6},
      new Segment {Id = 5, StartingPointId = 2, EndingPointId = 4, Length = 24, Points = 5, PointsBack = 6},
      new Segment {Id = 6, StartingPointId = 2, EndingPointId = 5, Length = 25, Points = 5, PointsBack = 6},
      new Segment {Id = 7, StartingPointId = 3, EndingPointId = 4, Length = 34, Points = 5, PointsBack = 6},
    };

    [HttpGet]
    public ICollection<Segment> GetAllSegments() => _segments;


    [HttpGet("{id}")]
    public Segment GetSegmentById(int id)
    {
      return _segments.SingleOrDefault(seg => seg.Id == id);
    }

    [HttpDelete("{id}")]
    public ActionResult DeleteSegment(int id)
    {
      if (_segments.All(seg => seg.Id != id))
        return BadRequest($"No segment with id {id} found");

      _segments.RemoveAll(seg => seg.Id == id);
      return Ok();
    }


  }
}