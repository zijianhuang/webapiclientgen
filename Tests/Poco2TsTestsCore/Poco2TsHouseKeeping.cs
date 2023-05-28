using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;
using Fonlow.Poco2Ts;
using Fonlow.Poco2Client;

namespace Poco2TsTests
{
    public class Poco2TsHouseKeeping
    {
        [Fact]
        public void TestReadDataContractAttribute()
        {
            Assert.True(CherryPicking.IsCherryType(typeof(DemoWebApi.DemoData.Address), CherryPickingMethods.DataContract));
        }

        [Fact]
        public void TestReadDataContractAttributePickNone()
        {
            Assert.False(CherryPicking.IsCherryType(typeof(DemoWebApi.Models.ChangePasswordBindingModel), CherryPickingMethods.DataContract));
        }

        [Fact]
        public void TestReadJsonObjectAttribute()
        {
            Assert.True(CherryPicking.IsCherryType(typeof(DemoWebApi.Models.ChangePasswordBindingModel), CherryPickingMethods.NewtonsoftJson));
        }

        [Fact]
        public void TestReadJsonObjectAttributePickNone()
        {
            Assert.False(CherryPicking.IsCherryType(typeof(DemoWebApi.DemoData.Address), CherryPickingMethods.NewtonsoftJson));
        }


        [Fact]
        public void TestReadSerializableAttribute()
        {
            Assert.True(CherryPicking.IsCherryType(typeof(DemoWebApi.Models.ExternalLoginViewModel), CherryPickingMethods.Serializable));
        }

        [Fact]
        public void TestPickTypeViaAspNet()
        {
            Assert.True(CherryPicking.IsCherryType(typeof(DemoWebApi.Models.ExternalLoginViewModel), CherryPickingMethods.AspNet));
        }

        [Fact]
        public void TestPickTypeAlways()
        {
            Assert.True(CherryPicking.IsCherryType(typeof(DemoWebApi.Models.ExternalLoginViewModel), CherryPickingMethods.All));
        }

    }
}
