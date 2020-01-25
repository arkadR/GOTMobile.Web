using System.Collections.Generic;
using System.Linq;
using GOTMobile.Web.Models;
using Microsoft.AspNetCore.Mvc;

namespace GOTMobile.Web.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class PointsController : ControllerBase
  {
    private readonly GOTMobileContext _gotMobileContext;

    public PointsController(GOTMobileContext gotMobileContext)
    {
      _gotMobileContext = gotMobileContext;
    }

    [HttpGet]
    public ICollection<Point> Get()
    {
      return _gotMobileContext.Point.ToList();
    }
  }
}