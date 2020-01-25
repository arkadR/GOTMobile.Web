using System;
using System.Collections.Generic;

namespace GOTMobile.Web.Models
{
    public partial class Segment
    {
        public int Id { get; set; }
        public int StartingPointId { get; set; }
        public int EndingPointId { get; set; }
        public int Length { get; set; }
        public int Points { get; set; }
        public int PointsBack { get; set; }

        public virtual Point EndingPoint { get; set; }
        public virtual Point StartingPoint { get; set; }
    }
}
