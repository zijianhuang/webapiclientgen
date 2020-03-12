using Fonlow.OpenApiClientGen.ClientTypes;
using Microsoft.OpenApi.Models;
using Microsoft.OpenApi.Readers;
using System.IO;
using Xunit;
using Fonlow.OpenApiClientGen.Cs;

namespace SwagTests
{
    public class ToCsFunctions
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
            OpenApiDocument doc = ReadJson(filePath);

            Settings settings = mySettings ?? new Settings()
            {
                ClientNamespace = "MyNS",
                PathPrefixToRemove="/api",
                ContainerClassName="Misc",
                ContainerNameStrategy= ContainerNameStrategy.Tags,
                GenerateBothAsyncAndSync=true
            };
            var gen = new ControllersClientApiGen(settings);
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
        public void TestValuesPaths()
        {
            GenerateAndAssert("SwagMock\\ValuesPaths.json", "Results\\ValuesPaths.txt");
        }

        [Fact]
        public void TestSimplePet()
        {
            GenerateAndAssert("SwagMock\\SimplePet.json", "Results\\SimplePet.txt");
        }

        [Fact]
        public void TestPet()
        {
            GenerateAndAssert("SwagMock\\pet.yaml", "Results\\Pet.txt");
        }

        [Fact]
        public void TestPetWithPathAsContainerName()
        {
            GenerateAndAssert("SwagMock\\pet.yaml","Results\\PetPathAsContainer.txt" , new Settings()
            {
                ClientNamespace = "MyNS",
                ContainerClassName = "Misc",
                ActionNameStrategy = ActionNameStrategy.MethodQueryParameters,
                ContainerNameStrategy = ContainerNameStrategy.Path,
                GenerateBothAsyncAndSync = false
            });
        }

        [Fact]
        public void TestPetWithGodContainerAndPathAction()
        {
            GenerateAndAssert("SwagMock\\pet.yaml", "Results\\PetGodClass.txt", new Settings()
            {
                ClientNamespace = "MyNS",
                ActionNameStrategy = ActionNameStrategy.PathMethodQueryParameters,
                ContainerNameStrategy = ContainerNameStrategy.None,
                GenerateBothAsyncAndSync = false
            });
        }

        [Fact]
        public void TestPetFindByStatus()
        {
            GenerateAndAssert("SwagMock\\PetFindByStatus.json", "Results\\PetFindByStatus.txt", new Settings()
            {
                ClientNamespace = "MyNS",
                PathPrefixToRemove = "/api",
                ContainerClassName = "Misc",
                SuffixOfContainerName="",
                GenerateBothAsyncAndSync = true
            });
        }

        [Fact]
        public void TestPetDelete()
        {
            GenerateAndAssert("SwagMock\\PetDelete.json", "Results\\PetDelete.txt");
        }

        [Fact]
        public void TestPetTypes()
        {
            GenerateAndAssert("SwagMock\\PetTypes.json", "Results\\PetTypes.txt");
        }

        [Fact]
        public void TestPetStore()
        {
            GenerateAndAssert("SwagMock\\petStore.yaml", "Results\\PetStore.txt");
        }

        [Fact]
        public void TestPetStoreExpanded()
        {
            GenerateAndAssert("SwagMock\\petStoreExpanded.yaml", "Results\\PetStoreExpanded.txt", new Settings()
            {
                ClientNamespace = "MyNS",
                ContainerClassName = "Misc",
                ActionNameStrategy = ActionNameStrategy.NormalizedOperationId,
                //RegexForNormalizedOperationId = @"\w*",
                ContainerNameStrategy = ContainerNameStrategy.Tags,
                GenerateBothAsyncAndSync = false

            });
        }

        [Fact]
        public void TestUspto()
        {
            GenerateAndAssert("SwagMock\\uspto.yaml", "Results\\Uspto.txt", new Settings() {
                ClientNamespace = "MyNS",
                ContainerClassName = "Misc",
                ActionNameStrategy = ActionNameStrategy.NormalizedOperationId,
                RegexForNormalizedOperationId= @"\w*",
                ContainerNameStrategy = ContainerNameStrategy.Tags,
                GenerateBothAsyncAndSync = false

            });
        }

        [Fact]
        public void TestMcp()
        {
            GenerateAndAssert("SwagMock\\mcp3.yaml", "Results\\mcp.txt", new Settings()
            {
                ClientNamespace = "MyNS",
                ContainerClassName = "McpClient",
                ActionNameStrategy = ActionNameStrategy.NormalizedOperationId,
                //RegexForNormalizedOperationId = @"\w*",
                ContainerNameStrategy = ContainerNameStrategy.None,
                GenerateBothAsyncAndSync = false,
                PathPrefixToRemove = "/mcp",
            });
        }

        [Fact]
        public void TestEBaySellAccount()
        {
            GenerateAndAssert("SwagMock\\sell_account_v1_oas3.json", "Results\\sell_account.txt");
        }

        [Fact]
        public void TestEBay_sell_analytics()
        {
            GenerateAndAssert("SwagMock\\sell_analytics_v1_oas3.yaml", "Results\\sell_analytics.txt");
        }

        [Fact]
        public void TestEBay_sell_compliance()
        {
            GenerateAndAssert("SwagMock\\sell_compliance_v1_oas3.yaml", "Results\\sell_compliance.txt");
        }

        [Fact]
        public void TestEBay_sell_finances()
        {
            GenerateAndAssert("SwagMock\\sell_finances_v1_oas3.yaml", "Results\\sell_finances.txt");
        }

        [Fact]
        public void TestEBay_sell_inventory()
        {
            GenerateAndAssert("SwagMock\\sell_inventory_v1_oas3.yaml", "Results\\sell_inventory.txt");
        }

        [Fact]
        public void TestEBay_sell_listing()
        {
            GenerateAndAssert("SwagMock\\sell_listing_v1_beta_oas3.yaml", "Results\\sell_listing.txt");
        }

        [Fact]
        public void TestEBay_sell_logistics()
        {
            GenerateAndAssert("SwagMock\\sell_logistics_v1_oas3.json", "Results\\sell_logistics.txt");
        }

        [Fact]
        public void TestEBay_sell_negotiation()
        {
            GenerateAndAssert("SwagMock\\sell_negotiation_v1_oas3.yaml", "Results\\sell_negotiation.txt");
        }

        [Fact]
        public void TestEBay_sell_marketing()
        {
            GenerateAndAssert("SwagMock\\sell_marketing_v1_oas3.json", "Results\\sell_marketing.txt");
        }

        [Fact]
        public void TestEBay_sell_metadata()
        {
            GenerateAndAssert("SwagMock\\sell_metadata_v1_oas3.json", "Results\\sell_metadata.txt");
        }

        [Fact]
        public void TestEBay_sell_recommendation()
        {
            GenerateAndAssert("SwagMock\\sell_recommendation_v1_oas3.yaml", "Results\\sell_recommendation.txt");
        }




    }
}