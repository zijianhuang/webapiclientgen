using System.Runtime.Serialization;

namespace Fonlow.PoemsApp.Data
{
	[DataContract]
	public class LoginModel
	{
		[DataMember]
		public string UserId { get; set; }
		[DataMember]
		public string Name { get; set; }
		[DataMember]
		public string FirstName { get; set; }
		[DataMember]
		public string LastName { get; set; }
		[DataMember]
		public string EmailAddress { get; set; }
		[DataMember]
		public string PictureUrl { get; set; }
		[DataMember]
		public string Provider { get; set; }
		[DataMember]
		public string IdToken { get; set; }
	}

}
