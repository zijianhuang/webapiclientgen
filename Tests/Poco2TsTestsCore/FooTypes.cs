using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Poco2TsTestsCore
{
	[DataContract]
	public class FooPerson
	{
		[DataMember]
		public string Surname { get; set; }
		public string GivenName { get; set; }
	}

	[JsonObjectAttribute(MemberSerialization = MemberSerialization.OptIn)]
	public class JsonPropertyPerson
	{
		[JsonProperty]
		public string Surname { get; set; }
		public string GivenName { get; set; }
	}
}
