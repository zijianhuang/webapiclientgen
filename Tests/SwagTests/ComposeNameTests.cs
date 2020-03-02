using System;
using Xunit;
using Fonlow.WebApiClientGen.Swag;
using Newtonsoft.Json;
using Microsoft.OpenApi.Models;
using Microsoft.OpenApi.Readers;
using Microsoft.OpenApi.Readers.Exceptions;
using Microsoft.OpenApi;
using System.IO;
using System.Text;
using System.Collections.Generic;
using Newtonsoft.Json.Linq;
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
			Assert.Equal("EntitiesPerson", composer.UrlToFunctionName("/api/Entities/person/{id}"));
		}

		[Fact]
		public void TestSwaggerTypeToClrType()
		{
			Assert.Equal(typeof(long), composer.PrimitiveSwaggerTypeToClrType("integer", "int64"));
			Assert.Equal(typeof(double), composer.PrimitiveSwaggerTypeToClrType("number", "double"));
			Assert.Equal(typeof(string), composer.PrimitiveSwaggerTypeToClrType("string", ""));
			Assert.Equal(typeof(DateTime), composer.PrimitiveSwaggerTypeToClrType("string", "date"));
			Assert.Equal(typeof(DateTime), composer.PrimitiveSwaggerTypeToClrType("string", "date-time"));
		}

		[Fact]
		public void TestReturnType()
		{
			var pathItem = doc.Paths["/api/SuperDemo/decimal/{d}"];
			var t = composer.GetActionReturnType(pathItem.Operations[OperationType.Get]);
			Assert.Equal(typeof(double), t);
		}

	}
}
