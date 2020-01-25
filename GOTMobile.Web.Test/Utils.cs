using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Moq;

namespace GOTMobile.Web.Test
{
  internal static class Utils
  {
    internal static Mock<DbSet<T>> CreateDbSetMock<T>(IList<T> elements) where T : class
    {
      var elementsAsQueryable = elements.AsQueryable();
      var dbSetMock = new Mock<DbSet<T>>();

      dbSetMock.As<IQueryable<T>>().Setup(m => m.Provider).Returns(elementsAsQueryable.Provider);
      dbSetMock.As<IQueryable<T>>().Setup(m => m.Expression).Returns(elementsAsQueryable.Expression);
      dbSetMock.As<IQueryable<T>>().Setup(m => m.ElementType).Returns(elementsAsQueryable.ElementType);
      dbSetMock.As<IQueryable<T>>().Setup(m => m.GetEnumerator()).Returns(() => elementsAsQueryable.GetEnumerator());
      dbSetMock.Setup(m => m.Add(It.IsAny<T>())).Callback<T>(elements.Add);
      dbSetMock.Setup(m => m.Remove(It.IsAny<T>())).Callback<T>(s => elements.Remove(s));

      return dbSetMock;
    }
  }
}
