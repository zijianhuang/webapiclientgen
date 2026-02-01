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

	[DataContract]
	public class TextJsonPerson
	{
		[DataMember]
		public string Surname { get; set; }
		[DataMember]
		public string GivenName { get; set; }
	}

	[DataContract]
	public class ZListCheck
	{
		[DataMember]
		public IEnumerable<int> Numbers { get; set; }

		[DataMember]
		public IList<Person> People { get; set; }

		[DataMember]
		public IList<TextJsonPerson> People2 { get; set; }

		[DataMember]
		public IQueryable<Company> Companies { get; set; }

		[DataMember]
		public IReadOnlyList<Trust> Trusts { get; set; }

		[DataMember]
		public IReadOnlyCollection<BizEntity> BizEntities { get; set; }

		[DataMember]
		public ObservableCollection<Entity> Entities { get; set; }

		[DataMember]
		public IAsyncEnumerable<Decimal> Decimals { get; set; }

		[DataMember]
		public Collection<string> Strings { get; set; }

		[DataMember]
		public HashSet<byte> BytesHashSet { get; set; }
	}
}
