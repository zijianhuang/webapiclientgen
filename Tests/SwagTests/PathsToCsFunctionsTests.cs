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

        static void AssertFile(string openApiFile, string expectedFile)
        {
            var s = TranslateJsonToCode(openApiFile);
            Assert.Equal(ReadFromResults(expectedFile), s);
        }

        [Fact]
        public void TestValuesPaths()
        {
            AssertFile("SwagMock\\ValuesPaths.json", "Results\\ValuesPaths.txt");
        }

        [Fact]
        public void TestSimplePet()
        {
            AssertFile("SwagMock\\SimplePet.json", "Results\\SimplePet.txt");
        }

        [Fact]
        public void TestPet()
        {
            AssertFile("SwagMock\\pet.yaml", "Results\\Pet.txt");
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
            Assert.Equal(ReadFromResults("Results\\PetPathAsContainer.txt"), s);
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
            Assert.Equal(ReadFromResults("Results\\PetGodClass.txt"), s);
        }

        [Fact]
        public void TestPetFindByStatus()
        {
            var s = TranslateJsonToCode("SwagMock\\PetFindByStatus.json", new Settings()
            {
                ClientNamespace = "MyNS",
                PathPrefixToRemove = "/api",
                ContainerClassName = "Misc",
                SuffixOfContainerName="",
                GenerateBothAsyncAndSync = true
            });
            Assert.Equal(ReadFromResults("Results\\PetFindByStatus.txt"), s);
        }

        [Fact]
        public void TestPetDelete()
        {
            AssertFile("SwagMock\\PetDelete.json", "Results\\PetDelete.txt");
        }

        [Fact]
        public void TestPetTypes()
        {
            AssertFile("SwagMock\\PetTypes.json", "Results\\PetTypes.txt");
        }

        [Fact]
        public void TestPetStore()
        {
            AssertFile("SwagMock\\petStore.yaml", "Results\\PetStore.txt");
        }

        [Fact]
        public void TestPetStoreExpanded()
        {
            var s = TranslateJsonToCode("SwagMock\\petStoreExpanded.yaml", new Settings()
            {
                ClientNamespace = "MyNS",
                ContainerClassName = "Misc",
                ActionNameStrategy = ActionNameStrategy.NormalizedOperationId,
                //RegexForNormalizedOperationId = @"\w*",
                ContainerNameStrategy = ContainerNameStrategy.Tags,
                GenerateBothAsyncAndSync = false

            });
            Assert.Equal(ReadFromResults("Results\\PetStoreExpanded.txt"), s);
        }

        [Fact]
        public void TestUspto()
        {
            var s = TranslateJsonToCode("SwagMock\\uspto.yaml", new Settings() {
                ClientNamespace = "MyNS",
                ContainerClassName = "Misc",
                ActionNameStrategy = ActionNameStrategy.NormalizedOperationId,
                RegexForNormalizedOperationId= @"\w*",
                ContainerNameStrategy = ContainerNameStrategy.Tags,
                GenerateBothAsyncAndSync = false

            });
            Assert.Equal(ReadFromResults("Results\\Uspto.txt"), s);
        }

        [Fact]
        public void TestMcp()
        {
            var s = TranslateJsonToCode("SwagMock\\mcp.yaml", new Settings()
            {
                ClientNamespace = "MyNS",
                ContainerClassName = "McpClient",
                ActionNameStrategy = ActionNameStrategy.NormalizedOperationId,
                //RegexForNormalizedOperationId = @"\w*",
                ContainerNameStrategy = ContainerNameStrategy.None,
                GenerateBothAsyncAndSync = false,
                PathPrefixToRemove = "/mcp",
            });
            Assert.Equal(ReadFromResults("Results\\PetStore.txt"), s);
        }




    }
}