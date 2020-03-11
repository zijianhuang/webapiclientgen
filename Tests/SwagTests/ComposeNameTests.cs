using Fonlow.OpenApiClientGen.ClientTypes;
using Microsoft.OpenApi.Models;
using Microsoft.OpenApi.Readers;
using System;
using System.IO;
using Xunit;

namespace SwagTests
{
	public class DocFixture
	{
		public DocFixture()
		{
			using (var stream = new FileStream("SwagMock\\myswagger.json", FileMode.Open, FileAccess.Read))
			{
				Doc = new OpenApiStreamReader().Read(stream, out var diagnostic);
				Composer= new NameComposer(new Settings
				{
					PathPrefixToRemove="/api",
				});
			}
		}

		public OpenApiDocument Doc { get; }

		public NameComposer Composer { get;}
	}

	public class ComposeNameTests : IClassFixture<DocFixture>
	{
		public ComposeNameTests(DocFixture fixture)
		{
			doc = fixture.Doc;
			composer = fixture.Composer;
		}

		OpenApiDocument doc;
		NameComposer composer;

		[Fact]
		public void TestHead()
		{
			Assert.Equal("My API", doc.Info.Title);
		}

		[Fact]
		public void TestComposeActionNameWithId()
		{
			var pathItem = doc.Paths["/api/Values/{id}"];
			var actionName = composer.ComposeActionName(pathItem.Operations[OperationType.Get], OperationType.Get.ToString());
			Assert.Equal("ValuesGetById", actionName);
		}

		[Fact]
		public void TestComposeActionName()
		{
			var pathItem = doc.Paths["/api/Values"];
			var actionName = composer.ComposeActionName(pathItem.Operations[OperationType.Get], OperationType.Get.ToString());
			Assert.Equal("ValuesGet", actionName);
		}

		[Fact]
		public void TestComposeActionNameWithParameters()
		{
			var pathItem = doc.Paths["/api/Entities/link"];
			var actionName = composer.ComposeActionName(pathItem.Operations[OperationType.Put], OperationType.Put.ToString());
			Assert.Equal("EntitiesPutByIdAndRelationship", actionName);
		}

		[Fact]
		public void TestUrlToFunctionName()
		{
			Assert.Equal("EntitiesPerson", composer.PathToActionOrContainerName("/api/Entities/person/{id}"));
		}

		[Fact]
		public void TestSwaggerTypeToClrType()
		{
			Assert.Equal(typeof(long), composer.PrimitiveSwaggerTypeToClrType("integer", "int64"));
			Assert.Equal(typeof(double), composer.PrimitiveSwaggerTypeToClrType("number", "double"));
			Assert.Equal(typeof(string), composer.PrimitiveSwaggerTypeToClrType("string", ""));
			Assert.Equal(typeof(DateTimeOffset), composer.PrimitiveSwaggerTypeToClrType("string", "date"));
			Assert.Equal(typeof(DateTimeOffset), composer.PrimitiveSwaggerTypeToClrType("string", "date-time"));
		}

		[Fact]
		public void TestReturnSimpleType()
		{
			var pathItem = doc.Paths["/api/SuperDemo/decimal/{d}"];
			var t = composer.GetOperationReturnSimpleTypeReference(pathItem.Operations[OperationType.Get]);
			Assert.Equal("System.Double", t.Item1.BaseType);
		}

		[Fact]
		public void TestReturnComplexType()
		{
			var pathItem = doc.Paths["/api/Entities/getPerson/{id}"];
			var t = composer.GetOperationReturnComplexTypeReference(pathItem.Operations[OperationType.Get]);
			Assert.Equal("Person", t);
		}

		//[Fact]
		//public void TestReturnTypePerson()
		//{
		//	var pathItem = doc.Paths["/api/Entities/getPerson/{id}"];
		//	var t = composer.GetOperationReturnType(pathItem.Operations[OperationType.Get]);
		//	Assert.Equal("Person", t.Item2);
		//}

		//[Fact]
		//public void TestReturnTypeDouble()
		//{
		//	var pathItem = doc.Paths["/api/SuperDemo/decimal/{d}"];
		//	var t = composer.GetOperationReturnType(pathItem.Operations[OperationType.Get]);
		//	Assert.Equal(typeof(double), t.Item1);
		//}

		[Fact]
		public void TestEnumType()
		{
			var type = typeof(PhoneType);
			var fields = type.GetFields();
			Assert.NotEmpty(fields);
		}

		[Fact]
		public void TestDataAnnotationsRange()
		{
			var d = new DDD()
			{
				PackSize = 1000
			};

			Assert.Equal(1000, d.PackSize); // no check.

			var s = Newtonsoft.Json.JsonConvert.SerializeObject(d);
			Assert.Equal("{\"packSize\":1000}", s); //no check in serialization
		}


	}

	public enum PhoneType
	{
		/// <summary>
		/// Land line
		/// </summary>
		Tel = 0,

		/// <summary>
		/// Mobile phone
		/// </summary>
		Mobile = 1,

		Skype = 2,
		Fax = 3,
	}

	public partial class DDD
	{
		/// <summary>The size of the pack the dog is from</summary>
		[Newtonsoft.Json.JsonProperty("packSize", Required = Newtonsoft.Json.Required.Always)]
		[System.ComponentModel.DataAnnotations.Range(1, 100)]
		public int PackSize { get; set; } = 1;
	}


}
