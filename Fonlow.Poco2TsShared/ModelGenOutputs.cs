using System;
using System.Collections.Generic;
using System.Text;

namespace Fonlow.Poco2Ts
{
	public class ModelGenOutputs
	{
		public string CSClientNamespaceSuffix { get; set; } = ".Client";

		/// <summary>
		/// System.ComponentModel.DataAnnotations attributes are to be copied over, including Required, Range, MaxLength, MinLength and StringLength.
		/// </summary>
		public bool DataAnnotationsEnabled { get; set; }

		/// <summary>
		/// System.ComponentModel.DataAnnotations attributes are translated into Doc Comments, 
		/// including Required, Range, MaxLength, MinLength, StringLength, DataType and RegularExpression..
		/// </summary>
		public bool DataAnnotationsToComments { get; set; }

		/// <summary>
		/// Generated data types will be decorated with DataContractAttribute and DataMemberAttribute.
		/// </summary>
		public bool DecorateDataModelWithDataContract { get; set; }

		/// <summary>
		/// When DecorateDataModelWithDataContract is true, this is the namespace of DataContractAttribute. For example, "http://mybusiness.com/09/2019
		/// </summary>
		public string DataContractNamespace { get; set; }

		public bool DecorateDataModelWithSerializable { get; set; }
	}


}
