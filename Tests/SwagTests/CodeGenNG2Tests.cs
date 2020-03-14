using Fonlow.OpenApiClientGen.ClientTypes;
using Microsoft.OpenApi.Models;
using Microsoft.OpenApi.Readers;
using System;
using System.IO;
using Xunit;
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

		static void GenerateAndAssert(string openApiFile, string expectedFile, Settings mySettings = null)
		{
			var s = TranslateJsonToCode(openApiFile, mySettings);
			//File.WriteAllText(expectedFile, s); //To update Results after some feature changes. Copy what in the bin folder back to the source content.
			Assert.Equal(ReadFromResults(expectedFile), s);
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
			GenerateAndAssert("SwagMock\\ValuesPaths.json", "NG2Results\\ValuesPaths.txt");
		}


		[Fact]
		public void TestPetDelete()
		{
			GenerateAndAssert("SwagMock\\PetDelete.json", "NG2Results\\PetDelete.txt");
		}

		[Fact]
		public void TestPet()
		{
			GenerateAndAssert("SwagMock\\pet.yaml", "NG2Results\\Pet.txt");
		}

		[Fact]
		public void TestPetWithPathAsContainerName()
		{
			GenerateAndAssert("SwagMock\\pet.yaml", "NG2Results\\PetPathAsContainer.txt", new Settings()
			{
				ClientNamespace = "MyNS",
				ContainerClassName = "Misc",
				ActionNameStrategy = ActionNameStrategy.MethodQueryParameters,
				ContainerNameStrategy = ContainerNameStrategy.Path,
			
			});
		}

		[Fact]
		public void TestPetWithGodContainerAndPathAction()
		{
			GenerateAndAssert("SwagMock\\pet.yaml" , "NG2Results\\PetGodClass.txt", new Settings()
			{
				ClientNamespace = "MyNS",
				ActionNameStrategy = ActionNameStrategy.PathMethodQueryParameters,
				ContainerNameStrategy = ContainerNameStrategy.None,
			
			});
		}

		[Fact]
		public void TestPetFindByStatus()
		{
			GenerateAndAssert("SwagMock\\PetFindByStatus.json" , "NG2Results\\PetFindByStatus.txt", new Settings()
			{
				ClientNamespace = "MyNS",
				PathPrefixToRemove = "/api",
				ContainerClassName = "Misc",
				ContainerNameSuffix = "",
				GenerateBothAsyncAndSync = true
			});
		}

		[Fact]
		public void TestPetStore()
		{
			GenerateAndAssert("SwagMock\\petStore.yaml", "NG2Results\\PetStore.txt");
		}

		[Fact]
		public void TestPetStoreExpanded()
		{
			GenerateAndAssert("SwagMock\\petStoreExpanded.yaml" , "NG2Results\\PetStoreExpanded.txt", new Settings()
			{
				ClientNamespace = "MyNS",
				ActionNameStrategy = ActionNameStrategy.NormalizedOperationId,
				ContainerNameStrategy = ContainerNameStrategy.Tags,
			});
		}

		[Fact]
		public void TestUspto()
		{
			GenerateAndAssert("SwagMock\\uspto.yaml" , "NG2Results\\Uspto.txt", new Settings()
			{
				ClientNamespace = "MyNS",
				ActionNameStrategy = ActionNameStrategy.NormalizedOperationId,
				ContainerNameStrategy = ContainerNameStrategy.Tags,
				

			});
		}

		[Fact]
		public void TestMcp()
		{
			GenerateAndAssert("SwagMock\\mcp.yaml", "NG2Results\\mcp.txt", new Settings()
			{
				ClientNamespace = "MyNS",
				ContainerClassName = "McpClient",
				ActionNameStrategy = ActionNameStrategy.NormalizedOperationId,
				//RegexForNormalizedOperationId = @"\w*",
				ContainerNameStrategy = ContainerNameStrategy.None,
				PathPrefixToRemove = "/mcp",
			});
		}

		[Fact]
		public void TestEBaySellAccount()
		{
			GenerateAndAssert("SwagMock\\sell_account_v1_oas3.json", "NG2Results\\sell_account.txt");
		}

		[Fact]
		public void TestEBay_sell_analytics()
		{
			GenerateAndAssert("SwagMock\\sell_analytics_v1_oas3.yaml", "NG2Results\\sell_analytics.txt");
		}

		[Fact]
		public void TestEBay_sell_compliance()
		{
			GenerateAndAssert("SwagMock\\sell_compliance_v1_oas3.yaml", "NG2Results\\sell_compliance.txt");
		}

		[Fact]
		public void TestEBay_sell_finances()
		{
			GenerateAndAssert("SwagMock\\sell_finances_v1_oas3.yaml", "NG2Results\\sell_finances.txt");
		}

		[Fact]
		public void TestEBay_sell_inventory()
		{
			GenerateAndAssert("SwagMock\\sell_inventory_v1_oas3.yaml", "NG2Results\\sell_inventory.txt");
		}

		[Fact]
		public void TestEBay_sell_listing()
		{
			GenerateAndAssert("SwagMock\\sell_listing_v1_beta_oas3.yaml", "NG2Results\\sell_listing.txt");
		}

		[Fact]
		public void TestEBay_sell_logistics()
		{
			GenerateAndAssert("SwagMock\\sell_logistics_v1_oas3.json", "NG2Results\\sell_logistics.txt");
		}

		[Fact]
		public void TestEBay_sell_negotiation()
		{
			GenerateAndAssert("SwagMock\\sell_negotiation_v1_oas3.yaml", "NG2Results\\sell_negotiation.txt");
		}

		[Fact]
		public void TestEBay_sell_marketing()
		{
			GenerateAndAssert("SwagMock\\sell_marketing_v1_oas3.json", "NG2Results\\sell_marketing.txt");
		}

		[Fact]
		public void TestEBay_sell_metadata()
		{
			GenerateAndAssert("SwagMock\\sell_metadata_v1_oas3.json", "NG2Results\\sell_metadata.txt");
		}

		[Fact]
		public void TestEBay_sell_recommendation()
		{
			GenerateAndAssert("SwagMock\\sell_recommendation_v1_oas3.yaml", "NG2Results\\sell_recommendation.txt");
		}


	}

}
