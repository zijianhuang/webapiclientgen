using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;
using System.Security.Principal;
using System.Text.Json.Serialization;

namespace DemoWebApi.DemoDataEx
{
	[DataContract]
	public class Trust
	{
		[DataMember]
		public string Trustee { get; set; }
	}

	[DataContract]
	public class TextJsonPerson
	{
		[DataMember(IsRequired =true)]
		public string Surname { get; set; }

		[DataMember]
		public string GivenName { get; set; }
	}

	/// <summary>
	/// Checking array.
	/// </summary>
	[DataContract]
	public class ZListCheck
	{
		[DataMember]
		public IEnumerable<int> Numbers { get; set; }


		[DataMember]
		public IList<TextJsonPerson> People2 { get; set; }


		[DataMember]
		public IReadOnlyList<Trust> Trusts { get; set; }


		[DataMember]
		public IAsyncEnumerable<Decimal> Decimals { get; set; }

		[DataMember]
		public Collection<string> Strings { get; set; }

		[DataMember]
		public HashSet<byte> BytesHashSet { get; set; }
	}
}
