using System.Collections.Generic;
using FluentAssertions;
using GOTMobile.Web.Controllers;
using GOTMobile.Web.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;

namespace GOTMobile.Web.Test
{
  [TestClass]
  public class ApiIntegrationTests
  {
    private SegmentsController _segmentsController;

    [TestInitialize]
    public void TestInit()
    {
      IList<Segment> segments = new List<Segment> {
        new Segment {Id = 1, StartingPointId = 1, EndingPointId = 2, Length = 1000, Points = 10, PointsBack = 7 }
      };
      var segmentsMock = Utils.CreateDbSetMock(segments);
      var dbMock = new Mock<GOTMobileContext>();
      dbMock.Setup(x => x.Segment).Returns(segmentsMock.Object);
      _segmentsController = new SegmentsController(dbMock.Object);
    }

    [TestMethod]
    public void PostSegment_SegmentAdded_Ok()
    {
      //Arrange 
      var initialSegmentCount = _segmentsController.GetAllSegments().Count;
      var segment = new Segment
      {
        Id = 1000,  //New segment id
        StartingPointId = 1,
        EndingPointId = 2,
        Points = 10,
        PointsBack = 10,
        Length = 10
      };

      //Act
      _segmentsController.PostSegment(segment);

      //Assert
      _segmentsController.GetAllSegments().Should().Contain(segment);
      _segmentsController.GetAllSegments().Should().HaveCount(initialSegmentCount + 1);
    }

    [TestMethod]
    public void PostSegment_SegmentUpdated_Ok()
    {
      //Arrange 
      var initialSegmentCount = _segmentsController.GetAllSegments().Count;
      var segment = new Segment
      {
        Id = 1, //Existing segment id
        StartingPointId = 1,
        EndingPointId = 2,
        Points = 10,
        PointsBack = 10,
        Length = 10
      };

      //Act
      _segmentsController.PostSegment(segment);

      //Assert
      _segmentsController.GetAllSegments().Should().Contain(segment);
      _segmentsController.GetAllSegments().Should().HaveCount(initialSegmentCount);
    }

    [TestMethod]
    public void GetSegmentById_SegmentReturned_Ok()
    {
      //Arrange 
      var segment = new Segment
      {
        Id = 1000,
        StartingPointId = 1,
        EndingPointId = 2,
        Points = 10,
        PointsBack = 10,
        Length = 10
      };
      _segmentsController.PostSegment(segment);

      //Act
      var response = _segmentsController.GetSegmentById(segment.Id);

      //Assert
      response.Should().BeOfType(typeof(OkObjectResult));
      (response as OkObjectResult).Value.Should().Be(segment);
    }

    [TestMethod]
    public void GetSegmentById_SegmentDoesNotExist_NotFound()
    {
      //Arrange 

      //Act
      var response = _segmentsController.GetSegmentById(1000);

      //Assert
      response.Should().BeOfType(typeof(NotFoundObjectResult));
      (response as NotFoundObjectResult).Value.Should().Be("No segment with id 1000.");
    }
  }
}
