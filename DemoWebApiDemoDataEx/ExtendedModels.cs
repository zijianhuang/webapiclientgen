using DemoWebApi.DemoData;
using DemoWebApi.DemoData.Base;
using System.Collections.ObjectModel;
using System.Runtime.Serialization;

namespace DemoWebApi.DemoDataEx
{
	[DataContract]
	public class Trust : BizEntity
	{
		[DataMember]
		public string Trustee { get; set; }
	}

	public class TextJsonPerson
	{
		public string Surname { get; set; }
		[System.Text.Json.Serialization.JsonIgnore]
		public string GivenName { get; set; }
	}

	public class ListCheck
	{
		public IEnumerable<int> Numbers { get; set; }

		public IList<Person> People { get; set; }

		public IQueryable<Company> Companies { get; set; }

		public IReadOnlyList<Trust> Trusts { get; set; }

		public IReadOnlyCollection<BizEntity> BizEntities { get; set; }

		public ObservableCollection<Entity> Entities { get; set; }

		public IAsyncEnumerable<Decimal> Decimals { get; set; }

		public Collection<string> Strings { get; set; }

		public HashSet<byte> BytesHashSet { get; set; }
	}
}
