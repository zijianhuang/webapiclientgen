using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
