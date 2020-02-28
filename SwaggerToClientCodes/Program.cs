using System;
using Microsoft.OpenApi.Models;
using Microsoft.OpenApi.Readers;
using Microsoft.OpenApi.Readers.Exceptions;
using Microsoft.OpenApi;
using System.IO;
using System.Text;

namespace SwaggerToClientCodes
{
	class Program
	{
		static void Main(string[] args)
		{
			Console.WriteLine("Hello World!");
			if (args.Length == 0)
			{
				Console.WriteLine("Need file path or URL");
			}

			var path = args[0];

			OpenApiDocument doc;
			using (var stream = new FileStream(path, FileMode.Open, FileAccess.Read))
			{
				doc = new OpenApiStreamReader().Read(stream, out var diagnostic);
			}

			Console.Write(doc.Info.FormatOpenApiInfo());
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
