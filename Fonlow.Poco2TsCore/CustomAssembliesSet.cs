using System;
using System.Linq;
using System.Reflection;

namespace Fonlow.Poco2TsCore
{
	/// <summary>
	/// 
	/// </summary>
	public class CustomAssembliesSet
	{
		/// <summary>
		/// Initializes a new instance of the CustomAssembliesSet class using the specified loaded assemblies and custom
		/// assembly names.
		/// </summary>
		/// <param name="customAssemblyNames">An array of assembly names to match against the loaded assemblies. Commonly from codeGenSettings.ApiSelections.AllDataModelAssemblyNames</param>
		public CustomAssembliesSet(string[] customAssemblyNames, string clientSuffix)
		{
			this.clientSuffix = string.IsNullOrEmpty(clientSuffix) ? "" : $"{clientSuffix}.";
			Assembly[] loadedAssemblies = AppDomain.CurrentDomain.GetAssemblies();
			common = loadedAssemblies.Select(d => d.GetName().Name).Intersect(customAssemblyNames, StringComparer.OrdinalIgnoreCase).ToArray();
		}

		readonly string[] common;
		readonly string clientSuffix;

		/// <summary>
		/// Being included means the type with the assembly is a custom type.
		/// </summary>
		/// <param name="assemblyName"></param>
		/// <returns></returns>
		public bool Included(string assemblyName) => common.Contains(assemblyName);

		public bool IsCustomType(Type type)
		{
			ArgumentNullException.ThrowIfNull(type);
			return Included(type.Assembly.GetName().Name);
		}

		public string GetClientTypeName(Type type)
		{
			ArgumentNullException.ThrowIfNull(type);
			if (IsCustomType(type))
			{
				return type.Namespace + clientSuffix + type.Name;
			}
			else
			{
				return type.ToString();
			}
		}
	}
}
