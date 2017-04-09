using System;

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
    }
}
