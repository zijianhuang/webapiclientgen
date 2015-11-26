using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Runtime.Serialization;

namespace DemoWebApi.Models
{
    [DataContract]
    public class Handy
    {
        [DataMember]
        public long Id
        { get; set; }

        [DataMember]
        public string Name
        {
            get; set;
        }
    }
}
