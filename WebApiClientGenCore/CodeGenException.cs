using System;
using System.Runtime.Serialization;

namespace Fonlow.Web.Meta
{
	[Serializable]
	public class CodeGenException : Exception
	{
		public CodeGenException()
		{

		}

		public CodeGenException(string message) : base(message) { }

		public CodeGenException(string message, Exception innerException) : base(message, innerException) { }

		public string Description { get; set; }

		public override void GetObjectData(SerializationInfo info, StreamingContext context)
		{
			base.GetObjectData(info, context);
		}

		protected CodeGenException(SerializationInfo serializationInfo, StreamingContext streamingContext): base(serializationInfo, streamingContext)
		{
		}
	}
}
