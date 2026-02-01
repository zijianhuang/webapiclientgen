using DemoWebApi.DemoData;
using DemoWebApi.DemoData.Base;
using System.Collections.ObjectModel;
using System.Runtime.Serialization;

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

	//public class AAMyGenericNested : MyGeneric<Person, MyGenericInt, MyGeneric<decimal, ZListCheck, Company>>
	//{
	//	public MyGeneric<MyGeneric<double, MyGenericInt, Entity>, ZListCheck, MimsResult<TextJsonPerson>> Special { get; set; }
	//}
}
