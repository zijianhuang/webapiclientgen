using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Runtime.Serialization;

namespace DemoWebApi.DemoData
{
    [DataContract(Namespace = Constants.DataNamespace)]
    public sealed class Constants
    {
        public const string DataNamespace = "http://fonlow.com/DemoData/2014/02";
    }


    [DataContract(Namespace = Constants.DataNamespace)]
    public class Entity
    {
        public Entity()
        {
            Addresses = new List<Address>();
        }
        [DataMember]
        public long Id { get; set; }

        [DataMember]
        public string Name { get; set; }

        [DataMember]
        public IList<Address> Addresses { get; set; }

        public override string ToString()
        {
            return Name;
        }
    }


    [DataContract(Namespace = Constants.DataNamespace)]
    public enum AddressType
    {
        [EnumMember]
        Postal,
        [EnumMember]
        Residential,
    };

    [DataContract(Namespace = Constants.DataNamespace)]
    public class Address
    {
        [DataMember]
        public string Street1 { get; set; }

        [DataMember]
        public string Street2 { get; set; }

        [DataMember]
        public string City { get; set; }

        [DataMember]
        public string State { get; set; }

        [DataMember]
        public string PostalCode { get; set; }

        [DataMember]
        public string Country { get; set; }

        [DataMember]
        public AddressType Type { get; set; }
    }

    [DataContract(Namespace = Constants.DataNamespace)]
    public class Person : Entity
    {
        [DataMember]
        public string Surname { get; set; }
        [DataMember]
        public string GivenName { get; set; }
        [DataMember]
        public DateTime? BirthDate { get; set; }

        public override string ToString()
        {
            return Surname + ", " + GivenName;
        }

    }

    [DataContract(Namespace = Constants.DataNamespace)]
    public class Company : Entity
    {
        [DataMember]
        public string BusinessNumber { get; set; }

        [DataMember]
        public string BusinessNumberType { get; set; }
    }


}
