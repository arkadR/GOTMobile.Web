using System.Runtime.Serialization;

namespace GOTMobile.Web.Models
{
  public class Segment
  {
    [DataMember]
    public int Id { get; set; }

    [DataMember]
    public int StartingPointId { get; set; }

    [DataMember]
    public int EndingPointId { get; set; }

    [DataMember]
    public int Length { get; set; }

    [DataMember]
    public int Points { get; set; }

    [DataMember]
    public int PointsBack { get; set; }
  }
}
