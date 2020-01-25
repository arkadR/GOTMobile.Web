using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace GOTMobile.Web.Models
{
    public partial class GOTMobileContext : DbContext
    {
        public GOTMobileContext()
        {
        }

        public GOTMobileContext(DbContextOptions<GOTMobileContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Point> Point { get; set; }
        public virtual DbSet<Segment> Segment { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=GOTMobile");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Point>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<Segment>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.HasOne(d => d.EndingPoint)
                    .WithMany(p => p.SegmentEndingPoint)
                    .HasForeignKey(d => d.EndingPointId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Segments_EndingPointId");

                entity.HasOne(d => d.StartingPoint)
                    .WithMany(p => p.SegmentStartingPoint)
                    .HasForeignKey(d => d.StartingPointId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Segments_StartingPointId");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
