using System;
using System.Linq;

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
		/// <param name="clientSuffix">The suffix to append to the namespace for client types. In general, from codeGen.json.</param>
		public CustomAssembliesSet(string[] customAssemblyNames, string clientSuffix)
		{
			this.clientSuffix = string.IsNullOrEmpty(clientSuffix) ? "" : $"{clientSuffix}.";
			//Assembly[] loadedAssemblies = AppDomain.CurrentDomain.GetAssemblies(); It could happen that some assemblies are not loaded yet when this constructor is called.
			// and after all, it is not a big deal that the app programmers have declared some assembly names that are actually rubbish.
			//common = loadedAssemblies.Select(d => d.GetName().Name).Intersect(customAssemblyNames, StringComparer.OrdinalIgnoreCase).ToArray();
			common = customAssemblyNames;
		}

		readonly string[] common;
		readonly string clientSuffix;

		/// <summary>
		/// Being included means the type with the assembly is a custom type.
		/// </summary>
		/// <param name="assemblyName"></param>
		/// <returns></returns>
		public bool Included(string assemblyName) => common.Contains(assemblyName, StringComparer.OrdinalIgnoreCase);

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
				if (type.IsGenericType)
				{
					var idx = type.Name.IndexOf('`');
					var typeName = type.Name.Substring(0, idx);
					return type.Namespace + clientSuffix + typeName;
				}

				return type.Namespace + clientSuffix + type.Name;
			}
			else
			{
				return type.ToString();
			}
		}
	}
}
