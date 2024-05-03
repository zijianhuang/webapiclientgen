using System;
using System.Linq;
using System.Xml.Serialization;
using System.Diagnostics;
using System.IO;
using System.Reflection;

namespace Fonlow.DocComment
{
	/// <summary>
	/// Lookup doc comment stored in an XML file.
	/// The xml parser in "XmlDocument.cs" is generated through xsd.exe XmlDocument.xsd /language:C# /namespace:Fonlow.DocComment /classes
	/// xsd.exe is located in C:\Program Files (x86)\Microsoft SDKs\Windows\v10.0A\bin\NETFX 4.8 Tools, or alike.
	/// </summary>
	public class DocCommentLookup
	{
		private DocCommentLookup()
		{

		}

		public doc XmlDoc { get; private set; }

		bool Load(string filePath)
		{
			XmlSerializer serializer = new XmlSerializer(typeof(doc));
			try
			{
				using (FileStream fs = new System.IO.FileStream(filePath, System.IO.FileMode.Open, System.IO.FileAccess.Read))
				{
#pragma warning disable CA5369 // Use XmlReader for 'XmlSerializer.Deserialize()'
					XmlDoc = serializer.Deserialize(fs) as doc;
#pragma warning restore CA5369 // Use XmlReader for 'XmlSerializer.Deserialize()'
					return XmlDoc != null;
				}

			}
			catch (Exception ex) when (ex is ArgumentException || ex is System.IO.IOException || ex is System.Security.SecurityException)
			{
				Trace.TraceWarning("Cannot locate the doc xml of the assembly: "+ ex.ToString());
				return false;
			}
		}

		/// <summary>
		/// 
		/// </summary>
		/// <param name="name">Fully qualified member name of doc comment XML. Like T:DemoWebApi.Areas.HelpPage.HelpPageSampleKey</param>
		/// <returns></returns>
		public docMember GetMember(string name)
		{
			return XmlDoc.members.SingleOrDefault(d => d.name == name);
		}

		/// <summary>
		/// Create an instance of DocCommentLookup.
		/// </summary>
		/// <param name="filePath">XML file of doc comment.</param>
		/// <returns></returns>
		public static DocCommentLookup Create(string filePath)
		{
			DocCommentLookup lookup = new DocCommentLookup();
			bool r = lookup.Load(filePath);
			if (r)
			{
				return lookup;
			}

			return null;
		}

		/// <summary>
		/// Get doc comment xml of the assembly
		/// </summary>
		/// <param name="assembly"></param>
		/// <returns></returns>
		public static string GetXmlPath(Assembly assembly)
		{
			string assemblyName = assembly.GetName().Name;
			string dirName = GetAssemblyDirectory(assembly);
			return Path.Combine(dirName, assemblyName + ".xml");
		}

		static string GetAssemblyDirectory(Assembly assembly)
		{
			string codeBase = assembly.Location;
			UriBuilder uri = new UriBuilder(codeBase);
			string path = Uri.UnescapeDataString(uri.Path);
			return Path.GetDirectoryName(path);
		}


	}
}
