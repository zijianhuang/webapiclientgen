using System.Runtime.Serialization;

namespace Fonlow.PoemsApp.Data
{
	public static class Constants
	{
		public const string ServiceNamespace = "http://fonlow.com/poetryapp/2023/01";
		public const string DataNamespace = "http://fonlow.com/poetryapp/Data/2023/01";
		//public const string AppCodeName = "PoetryApp";
	}

	/// <summary>
	/// Specific Poems Exceptions
	/// </summary>
	[Serializable]
	public class AppException : Exception
	{
		public AppException(string messaage) : base(messaage)
		{

		}

		public AppException() : base()
		{

		}

		public AppException(string message, Exception innerException) : base(message, innerException)
		{

		}
	}


	[Serializable]
	public class AppArgumentException : ArgumentException
	{
		public AppArgumentException(string messaage) : base(messaage)
		{

		}

		public AppArgumentException() : base()
		{

		}


		public AppArgumentException(string message, Exception innerException) : base(message, innerException)
		{

		}

		public AppArgumentException(string message, string paramName) : base(message, paramName)
		{

		}


		public AppArgumentException(string message, string paramName, Exception innerException) : base(message, paramName, innerException)
		{

		}

	}

	[Serializable]
	public class AppArgumentNullException : AppArgumentException
	{
		public AppArgumentNullException(string messaage) : base(messaage)
		{

		}

		public AppArgumentNullException() : base()
		{

		}

		public AppArgumentNullException(string message, Exception innerException) : base(message, innerException)
		{

		}

		public AppArgumentNullException(string message, string paramName) : base(message, paramName)
		{

		}
	}

}
