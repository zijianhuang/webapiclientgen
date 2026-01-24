using DemoWebApi.DemoData;
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
}
