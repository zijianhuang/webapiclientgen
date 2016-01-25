using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Runtime.Serialization;

namespace DemoWebApi.DemoData
{
    public sealed class Constants
    {
        public const string DataNamespace = "http://fonlow.com/DemoData/2014/02";
    }

    [DataContract(Namespace = Constants.DataNamespace)]
    public enum AddressType
    {
        [EnumMember]
        Postal,
        [EnumMember]
        Residential,
    };
  
    public enum MyEnumType
    {
        [EnumMember]
        First = 1,
        [EnumMember]
        Two = 2,
    };

    [DataContract(Namespace = Constants.DataNamespace)]
    public enum Days
    {
        [EnumMember]
        Sat = 1,
        [EnumMember]
        Sun,
        [EnumMember]
        Mon,
        [EnumMember]
        Tue,
        [EnumMember]
        Wed,
        [EnumMember]
        Thu,
        [EnumMember]
        Fri
    };


    [DataContract(Namespace = Constants.DataNamespace)]
    public class Address
    {
        [DataMember]
        public Guid Id { get; set; }

        public Entity Entity { get; set; }

        /// <summary>
        /// Foreign key to Entity
        /// </summary>
        public Guid EntityId { get; set; }

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

        [DataMember]
        public DemoWebApi.DemoData.Another.MyPoint Location;
    }


    [DataContract(Namespace = Constants.DataNamespace)]
    public class Entity
    {
        public Entity()
        {
            Addresses = new List<Address>();
        }

        [DataMember]
        public Guid Id { get; set; }

        
        [DataMember(IsRequired =true)]//MVC and Web API does not care
        [System.ComponentModel.DataAnnotations.Required]//MVC and Web API care about only this
        public string Name { get; set; }

        [DataMember]
        public IList<Address> Addresses { get; set; }

        public override string ToString()
        {
            return Name;
        }
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

        [DataMember]
        public string[][] TextMatrix
        { get; set; }

        [DataMember]
        public int[][] Int2DJagged;

        [DataMember]
        public int[,] Int2D;

        [DataMember]
        public IEnumerable<string> Lines;
    }

    [DataContract(Namespace = Constants.DataNamespace)]
    public class MyPeopleDic 
    {
        [DataMember]
        public IDictionary<string, Person> Dic { get; set; }

        [DataMember]
        public IDictionary<string, string> AnotherDic { get; set; }

        [DataMember]
        public IDictionary<int, string> IntDic { get; set; }
     
    }

}

namespace DemoWebApi.DemoData.Another
{
    [DataContract(Namespace = Constants.DataNamespace)]
    public struct MyPoint
    {
        [DataMember]
        public double X;
        [DataMember]
        public double Y;
    }
}
