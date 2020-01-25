using System;
using System.Collections.Generic;

namespace GOTMobile.Web.Models
{
    public partial class Point
    {
        public Point()
        {
            SegmentEndingPoint = new HashSet<Segment>();
            SegmentStartingPoint = new HashSet<Segment>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public float Latitude { get; set; }
        public float Longitude { get; set; }
        public float Altitude { get; set; }

        public virtual ICollection<Segment> SegmentEndingPoint { get; set; }
        public virtual ICollection<Segment> SegmentStartingPoint { get; set; }
    }
}
