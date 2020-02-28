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
			}
		}

		public OpenApiDocument Doc { get; }
	}

	public class ComposeName : IClassFixture<DocFixture>
	{
		public ComposeName(DocFixture fixture)
		{
			doc = fixture.Doc;
		}

		OpenApiDocument doc;

		[Fact]
		public void TestHead()
		{
			Assert.Equal("My API", doc.Info.Title);
		}

		[Fact]
		public void TestComposeActionNameWithId()
		{
			var pathItem = doc.Paths["/api/Values/{id}"];

			NameComposer composer = new NameComposer(new Settings
			{

			});
			var actionName = composer.ComposeActionName(pathItem.Operations[OperationType.Get], OperationType.Get.ToString());
			Assert.Equal("ValuesGetById", actionName);
		}

		[Fact]
		public void TestComposeActionName()
		{
			var pathItem = doc.Paths["/api/Values"];

			NameComposer composer = new NameComposer(new Settings
			{

			});
			var actionName = composer.ComposeActionName(pathItem.Operations[OperationType.Get], OperationType.Get.ToString());
			Assert.Equal("ValuesGet", actionName);
		}

		[Fact]
		public void TestComposeActionNameWithParameters()
		{
			var pathItem = doc.Paths["/api/Entities/link"];

			NameComposer composer = new NameComposer(new Settings
			{

			});
			var actionName = composer.ComposeActionName(pathItem.Operations[OperationType.Put], OperationType.Put.ToString());
			Assert.Equal("EntitiesPutByIdAndRelationship", actionName);
		}

	}
}
