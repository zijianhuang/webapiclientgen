using Fonlow.OpenApi.ClientTypes;
using Microsoft.OpenApi.Models;
using Microsoft.OpenApi.Readers;
using System.IO;
using Xunit;
using Fonlow.CodeDom.Web;
using System;
namespace SwagTests
{
	public class CodeGenNG2Tests
	{
		static OpenApiDocument ReadJson(string filePath)
		{
			using (var stream = new FileStream(filePath, FileMode.Open, FileAccess.Read))
			{
				return new OpenApiStreamReader().Read(stream, out var diagnostic);
			}
		}

		static string TranslateJsonToCode(string filePath, Settings mySettings=null)
		{
			Func<string, string, string> CreateTsPath = (folder, fileName) =>
			{
				if (!string.IsNullOrEmpty(folder))
				{
					string theFolder;
					try
					{
						theFolder = System.IO.Path.IsPathRooted(folder) ?
							folder : System.IO.Path.Combine(Directory.GetCurrentDirectory(), folder);

					}
					catch (ArgumentException e)
					{
						System.Diagnostics.Trace.TraceWarning(e.Message);
						throw;
					}

					if (!System.IO.Directory.Exists(theFolder))
					{
						throw new ArgumentException("TypeScript Folder Not Exist");
					}
					return System.IO.Path.Combine(theFolder, fileName);
				};

				return null;
			};

			OpenApiDocument doc = ReadJson(filePath);

			Settings settings = mySettings ?? new Settings()
			{
				ClientNamespace = "MyNS",
				PathPrefixToRemove = "/api",
				ContainerClassName = "Misc",
				ContainerNameStrategy = ContainerNameStrategy.Tags,
			};

			var codeCompileUnit = new System.CodeDom.CodeCompileUnit();
			var clientNamespace = new System.CodeDom.CodeNamespace(settings.ClientNamespace);
			codeCompileUnit.Namespaces.Add(clientNamespace);//namespace added to Dom
			var jsOutput = new JSOutput
			{
				CamelCase = settings.CamelCase,
				JSPath = CreateTsPath("Results", filePath),
				AsModule = true,
				ContentType = "application/json;charset=UTF-8",
				ClientNamespaceSuffix = "Client",
			};

			var gen = new Fonlow.CodeDom.Web.Ts.ControllersTsNG2ClientApiGen(settings, jsOutput);
			gen.CreateCodeDom(doc.Paths, doc.Components);
			return gen.WriteToText();
		}

		static string ReadFromResults(string filePath)
		{
			return File.ReadAllText(filePath);
		}

		[Fact]
		public void TestSimplePet()
		{
			string expected = @"export namespace MyNS {
	export interface Pet {

		/**The name given to a pet */
		name?: string;

		/**Type of a pet */
		petType?: string;
	}

}

";
			var s = TranslateJsonToCode("SwagMock\\SimplePet.json");
			Assert.Equal(expected, s);
		}


		[Fact]
		public void TestSimplePetCat()
		{
			string expected = @"export namespace MyNS {
	export interface Pet {

		/**The name given to a pet */
		name?: string;

		/**Type of a pet */
		petType?: string;
	}


	/**A representation of a cat */
	export interface Cat extends Pet {

		/**The measured skill for hunting */
		huntingSkill?: string;
	}

}

";
			var s = TranslateJsonToCode("SwagMock\\SimplePetCat.json");
			Assert.Equal(expected, s);
		}

		[Fact]
		public void TestSimpleEnum()
		{
			string expected = @"export namespace MyNS {

	/**Phone types */
	export enum PhoneType { Tel = 0, Mobile = 1, Skype = 2, Fax = 3 }

}

";
			var s = TranslateJsonToCode("SwagMock\\Enum.json");
			Assert.Equal(expected, s);
		}

		[Fact]
		public void TestSimpleIntEnum()
		{
			string expected = @"export namespace MyNS {

	/**Integer enum types */
	export enum IntType { _1 = 0, _2 = 1, _3 = 2, _4 = 3 }

}

";
			var s = TranslateJsonToCode("SwagMock\\IntEnum.json");
			Assert.Equal(expected, s);
		}


		[Fact]
		public void TestCasualEnum()
		{
			string expected = @"export namespace MyNS {
	export interface Pet {

		/**The name given to a pet */
		name?: string;

		/**Type of a pet */
		petType?: string;

		/**Pet status in the store */
		status?: PetStatus;
	}

	export enum PetStatus { available = 0, pending = 1, sold = 2 }

}

";
			var s = TranslateJsonToCode("SwagMock\\CasualEnum.json");
			Assert.Equal(expected, s);
		}

		[Fact]
		public void TestStringArray()
		{
			string expected = @"export namespace MyNS {
	export interface Pet {

		/**The name given to a pet */
		name?: string;

		/**Type of a pet */
		petType?: string;

		/**The list of URL to a cute photos featuring pet */
		photoUrls?: Array<string>;
	}

}

";
			var s = TranslateJsonToCode("SwagMock\\StringArray.json");
			Assert.Equal(expected, s);
		}

		[Fact]
		public void TestCustomTypeArray()
		{
			string expected = @"export namespace MyNS {
	export interface Pet {

		/**The name given to a pet */
		name?: string;

		/**Type of a pet */
		petType?: string;

		/**Tags attached to the pet */
		tags?: Array<Tag>;
	}

	export interface Tag {

		/**Tag ID */
		id?: number;

		/**Tag name */
		name?: string;
	}

}

";
			var s = TranslateJsonToCode("SwagMock\\CustomTypeArray.json");
			Assert.Equal(expected, s);
		}

		[Fact]
		public void TestSimpleOrder()
		{
			string expected = @"export namespace MyNS {
	export interface Order {
		quantity?: number;

		/**Estimated ship date */
		shipDate?: Date;

		/**Order Status */
		status?: OrderStatus;

		/**Indicates whenever order was completed or not */
		complete?: boolean;

		/**Unique Request Id */
		requestId?: string;
	}

	export enum OrderStatus { placed = 0, approved = 1, delivered = 2 }

}

";
			var s = TranslateJsonToCode("SwagMock\\SimpleOrder.json");
			Assert.Equal(expected, s);
		}

		[Fact]
		public void TestTypeAlias()
		{
			string expected = @"export namespace MyNS {
	export interface Tag {

		/**Tag ID */
		id?: number;

		/**Tag name */
		name?: string;
	}

}

";
			var s = TranslateJsonToCode("SwagMock\\TypeAlias.json");
			Assert.Equal(expected, s);
		}

		[Fact]
		public void TestRequired()
		{
			string expected = @"export namespace MyNS {
	export interface Pet {

		/**The name given to a pet */
		name: string;

		/**Type of a pet */
		petType?: string;
	}


	/**A representation of a cat */
	export interface Cat extends Pet {

		/**The measured skill for hunting */
		huntingSkill: string;
	}

}

";
			var s = TranslateJsonToCode("SwagMock\\Required.json");
			Assert.Equal(expected, s);
		}

		[Fact]
		public void TestValuesPaths()
		{
			var s = TranslateJsonToCode("SwagMock\\ValuesPaths.json");
			Assert.Equal(ReadFromResults("NG2Results\\ValuesPaths.txt"), s);
		}


		[Fact]
		public void TestPetDelete()
		{
			var s = TranslateJsonToCode("SwagMock\\PetDelete.json");
			Assert.Equal(ReadFromResults("NG2Results\\PetDelete.txt"), s);
		}

		[Fact]
		public void TestPet()
		{
			var s = TranslateJsonToCode("SwagMock\\pet.yaml");
			Assert.Equal(ReadFromResults("NG2Results\\Pet.txt"), s);
		}

		[Fact]
		public void TestPetWithPathAsContainerName()
		{
			var s = TranslateJsonToCode("SwagMock\\pet.yaml", new Settings()
			{
				ClientNamespace = "MyNS",
				ContainerClassName = "Misc",
				ActionNameStrategy = ActionNameStrategy.MethodQueryParameters,
				ContainerNameStrategy = ContainerNameStrategy.Path,
				GenerateBothAsyncAndSync = false
			});
			Assert.Equal(ReadFromResults("NG2Results\\PetPathAsContainer.txt"), s);
		}

		[Fact]
		public void TestPetWithGodContainerAndPathAction()
		{
			var s = TranslateJsonToCode("SwagMock\\pet.yaml", new Settings()
			{
				ClientNamespace = "MyNS",
				ActionNameStrategy = ActionNameStrategy.PathMethodQueryParameters,
				ContainerNameStrategy = ContainerNameStrategy.None,
				GenerateBothAsyncAndSync = false
			});
			Assert.Equal(ReadFromResults("NG2Results\\PetGodClass.txt"), s);
		}

		[Fact]
		public void TestPetFindByStatus()
		{
			var s = TranslateJsonToCode("SwagMock\\PetFindByStatus.json", new Settings()
			{
				ClientNamespace = "MyNS",
				PathPrefixToRemove = "/api",
				ContainerClassName = "Misc",
				SuffixOfContainerName = "",
				GenerateBothAsyncAndSync = true
			});
			Assert.Equal(ReadFromResults("NG2Results\\PetFindByStatus.txt"), s);
		}

		[Fact]
		public void TestPetStore()
		{
			var s = TranslateJsonToCode("SwagMock\\petStore.yaml");
			Assert.Equal(ReadFromResults("NG2Results\\PetStore.txt"), s);
		}

		[Fact]
		public void TestPetStoreExpanded()
		{
			var s = TranslateJsonToCode("SwagMock\\petStoreExpanded.yaml", new Settings()
			{
				ClientNamespace = "MyNS",
				ActionNameStrategy = ActionNameStrategy.NormalizedOperationId,
				ContainerNameStrategy = ContainerNameStrategy.Tags,
				GenerateBothAsyncAndSync = false

			});
			Assert.Equal(ReadFromResults("NG2Results\\PetStoreExpanded.txt"), s);
		}

		[Fact]
		public void TestUspto()
		{
			var s = TranslateJsonToCode("SwagMock\\uspto.yaml", new Settings()
			{
				ClientNamespace = "MyNS",
				ActionNameStrategy = ActionNameStrategy.NormalizedOperationId,
				ContainerNameStrategy = ContainerNameStrategy.Tags,
				GenerateBothAsyncAndSync = false

			});
			Assert.Equal(ReadFromResults("NG2Results\\Uspto.txt"), s);
		}

	}

}
