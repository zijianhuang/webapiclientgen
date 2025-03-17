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
}
