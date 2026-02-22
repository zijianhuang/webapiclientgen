using DemoWebApi.DemoData;
using DemoWebApi.DemoData.Base;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;
using System.Text.Json.Serialization;

namespace DemoWebApi.DemoDataEx
{
	public class Trust : BizEntity
	{
		public string Trustee { get; set; }
	}

	public class TextJsonPerson
	{
		public string Surname { get; set; }
		[DataMember]
		public string GivenName { get; set; }
	}

	public class ZListCheck
	{
		public IEnumerable<int> Numbers { get; set; }

		public IList<Person> People { get; set; }

		public IList<TextJsonPerson> People2 { get; set; }

		public IQueryable<Company> Companies { get; set; }

		public IReadOnlyList<Trust> Trusts { get; set; }

		public IReadOnlyCollection<BizEntity> BizEntities { get; set; }

		public ObservableCollection<Entity> Entities { get; set; }

		public IAsyncEnumerable<Decimal> Decimals { get; set; }

		public Collection<string> Strings { get; set; }

		public HashSet<byte> BytesHashSet { get; set; }
	}

	public class AAMyGenericNested : MyGeneric<Person, MyGenericInt, MyGeneric<decimal, ZListCheck, Company>>
	{
		public MyGeneric<MyGeneric<double, MyGenericInt, Entity>, ZListCheck, MimsResult<TextJsonPerson>> Special { get; set; }
	}

	public class DotNetJsonType
	{
		/// <summary>
		/// JsonRequired means the property is required in JSON, but it can be null or empty string. 
		/// </summary>
		[JsonRequired]
		public string Name { get; set; }

		/// <summary>
		/// Required means the property is required and cannot be null or empty string.
		/// </summary>
		[Required]
		public string Location { get; set; }

		public string Description { get; set; }

		[Required]
		[JsonRequired]
		public string DoubleRequired { get; set; }
	}

}
