using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace DebugWeb.Data
{
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
