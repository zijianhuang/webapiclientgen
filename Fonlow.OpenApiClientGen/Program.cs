using Microsoft.OpenApi.Models;
using Microsoft.OpenApi.Readers;
using Microsoft.Extensions.Logging;
using System;
using System.IO;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.Diagnostics;

namespace Fonlow.OpenApiClientGen
{
	class Program
	{
		static void Main(string[] args)
		{
			Console.WriteLine("Fonlow.OpenApiClientGen.exe generates C# and TypeScript client codes according to an Open API YAML/JSON file.");
			
			if (args.Length == 0)
			{
				ShowHelp();
				Console.WriteLine("Warning: Need yaml/json path and settings path.");
				return;
			}

			if (args.Length == 1)
			{
				ShowHelp();
				Console.WriteLine("Warning: Need settings path.");
				return;
			}

			var configuration = new ConfigurationBuilder()
					.AddJsonFile("appsettings.json", false, true)
					.Build();

			ILogger logger;

			using (var serviceProvider = new ServiceCollection()
				.AddLogging(cfg =>
				{
					cfg.AddConfiguration(configuration.GetSection("Logging"));
					cfg.AddConsole();
				})
				.BuildServiceProvider())
			{
				logger = serviceProvider.GetService<ILogger<Program>>();
			}

			logger.LogInformation("Program logger loaded");

			using (var listener = new Fonlow.Diagnostics.LoggerTraceListener(logger))
			{
				System.Diagnostics.Trace.Listeners.Add(listener);

				var defFile = args[0];
				var settingsFile = args[1];

				var settingsString = File.ReadAllText(settingsFile);
				var settings = System.Text.Json.JsonSerializer.Deserialize<ClientTypes.Settings>(settingsString);

				OpenApiDocument doc;
				using (var stream = new FileStream(defFile, FileMode.Open, FileAccess.Read))
				{
					doc = new OpenApiStreamReader().Read(stream, out var diagnostic);
				}

				Console.WriteLine("Processing...");
				Trace.TraceInformation(doc.Info.FormatOpenApiInfo());

				Fonlow.CodeDom.Web.CodeGen.GenerateClientAPIs(settings, doc.Paths, doc.Components, Directory.GetCurrentDirectory());

				Console.WriteLine("Done");
			}
		}

		static void ShowHelp()
		{
			Console.WriteLine(@"
Parameter 1: Open API YAML/JSON file
Parameter 2: Settings file in JSON format.
Example:  
For classes decorated by DataContractAttribute:
  Fonlow.OpenApiClientGen.exe my.yaml
For classes decorated by Newtonsoft.Json.JsonObjectAttribute:
  Fonlow.OpenApiClientGen.exe my.yaml myproj.json
For classes decorated by SerializableAttribute:
  Fonlow.OpenApiClientGen.exe my.yaml ..\myproj.json

");
		}

	}

	public static class OpenApiDocExtentions
	{
		public static string FormatOpenApiInfo(this OpenApiInfo info)
		{
			var builder = new StringBuilder();
			builder.AppendLine(info.Title);
			builder.AppendLine("V " + info.Version);
			builder.AppendLine(info.Description);
			return builder.ToString();
		}

	}
}
