using Fonlow.CodeDom.Web;
using System.Text.Json;

namespace GenAbstractTests
{
	public class CodeGenJson
	{
		[Fact]
		public void TestReadCodeGenJson()
		{
			var jsonText = File.ReadAllText(@"..\..\..\..\..\DemoCoreWeb\CodeGen.json");
			var settings = System.Text.Json.JsonSerializer.Deserialize<CodeGenSettings>(jsonText, new System.Text.Json.JsonSerializerOptions()
			{
				ReadCommentHandling = JsonCommentHandling.Skip,
				AllowTrailingCommas = true,
			});
			Assert.NotNull(settings);
		}

		[Fact]
		public void TestReadCodeGenJsonThrows()
		{
			var jsonText = File.ReadAllText(@"..\..\..\..\..\DemoCoreWeb\CodeGen.json");
			Assert.Throws<System.Text.Json.JsonException>(()=>System.Text.Json.JsonSerializer.Deserialize<CodeGenSettings>(jsonText));
		}

		[Fact]
		public void TestReadCodeGenJsonWithNewtonSoft()
		{
			var jsonText = File.ReadAllText(@"..\..\..\..\..\DemoCoreWeb\CodeGen.json");
			var settings = Newtonsoft.Json.JsonConvert.DeserializeObject<CodeGenSettings>(jsonText);
			Assert.NotNull(settings);
		}

	}
}