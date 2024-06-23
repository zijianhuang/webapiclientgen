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
	}

	[Serializable]
	public class CodeGenLoadPluginException : CodeGenException
	{
		public CodeGenLoadPluginException()
		{

		}

		public CodeGenLoadPluginException(string message) : base(message) { }

		public CodeGenLoadPluginException(string message, Exception innerException) : base(message, innerException) { }
	}

	[Serializable]
	public class CodeGenReadPluginException : CodeGenException
	{
		public CodeGenReadPluginException()
		{

		}

		public CodeGenReadPluginException(string message) : base(message) { }

		public CodeGenReadPluginException(string message, Exception innerException) : base(message, innerException) { }
	}
}
