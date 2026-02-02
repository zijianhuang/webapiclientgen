using Fonlow.Poco2TsCore;
using Fonlow.Reflection;
using System;
using System.CodeDom;
using System.Diagnostics;
using System.Linq;
using System.Reflection;

namespace Fonlow.Poco2Client
{
	/// <summary>
	/// Some shared functions used by CsPodgen and TsPodGen
	/// </summary>
	public static class PodGenHelper
	{
		public static CodeTypeDeclaration CreatePodClientEnum(CodeNamespace ns, string className)
		{
			CodeTypeDeclaration targetClass = new CodeTypeDeclaration(className)
			{
				IsEnum = true,
			};

			ns.Types.Add(targetClass);
			return targetClass;
		}

		public static Type[] GetCherryTypes(Assembly assembly, CherryPickingMethods cherryPickingMethods)
		{
			try
			{
				return assembly.GetTypes().Where(type => (TypeHelper.IsClassOrStruct(type) || type.IsEnum)
				&& CherryPicking.IsCherryType(type, cherryPickingMethods)).ToArray();
			}
			catch (ReflectionTypeLoadException e)
			{
				foreach (Exception ex in e.LoaderExceptions)
				{
					Trace.TraceWarning(String.Format("When loading {0}, GetTypes errors occur: {1}", assembly.FullName, ex.Message));
				}
			}
			catch (TargetInvocationException e)
			{
				Trace.TraceWarning(String.Format("When loading {0}, GetTypes errors occur: {1}", assembly.FullName, e.Message + "~~" + e.InnerException.Message));
			}

			return null;
		}

		/// <summary>
		/// Find if a genertic type exists in assembly according typeFullName
		/// </summary>
		/// <param name="assembly"></param>
		/// <param name="typeFullName">full name including namespace</param>
		/// <returns>Type if found, null if not found</returns>
		public static Type FindGenericTypeDef(Assembly assembly, string typeFullName)
		{
			var types = GetCherryTypes(assembly, CherryPickingMethods.All);
			var found = types.SingleOrDefault(d => d.FullName == typeFullName && d.IsGenericTypeDefinition && d.IsTypeDefinition && d.ContainsGenericParameters);
			return found;
		}

		public static CodeTypeDeclaration CreatePodClientClass(CodeNamespace ns, string typeName)
		{
			CodeTypeDeclaration ctd = new CodeTypeDeclaration(typeName)
			{
				TypeAttributes = TypeAttributes.Public | TypeAttributes.Class, //setting IsInterface has no use
			};

			ns.Types.Add(ctd);
			return ctd;
		}

		public static CodeTypeDeclaration CreatePodClientStruct(CodeNamespace ns, string typeName)
		{
			CodeTypeDeclaration ctd = new CodeTypeDeclaration(typeName)
			{
				TypeAttributes = TypeAttributes.Public,
				IsStruct = true
			};

			ns.Types.Add(ctd);
			return ctd;
		}

		public static CodeTypeDeclaration CreatePodClientInterface(CodeNamespace ns, string typeName)
		{
			CodeTypeDeclaration ctd = new CodeTypeDeclaration(typeName)
			{
				TypeAttributes = TypeAttributes.Public | TypeAttributes.Interface, //setting IsInterface has no use
			};

			ns.Types.Add(ctd);
			return ctd;
		}

		/// <summary>
		/// Add type as class to namespace of CodeDOM.
		/// </summary>
		/// <param name="ns"></param>
		/// <param name="type"></param>
		/// <param name="customAssembliesSet"></param>
		/// <returns></returns>
		public static CodeTypeDeclaration CreatePodClientGenericClass(CodeNamespace ns, Type type, CustomAssembliesSet customAssembliesSet)
		{
			Type genericTypeDefinition = type.GetGenericTypeDefinition();
			Type[] genericArguments = type.GetGenericArguments();
			var isClosedGeneric = !type.IsGenericTypeDefinition;

			string goodGenericClassName = SanitiseGenericClassName(genericTypeDefinition.Name);

			CodeTypeDeclaration ctd = new CodeTypeDeclaration(goodGenericClassName)
			{
				TypeAttributes = TypeAttributes.Public | TypeAttributes.Class, //setting IsInterface has no use
			};

			ctd.TypeParameters.AddRange(genericArguments.Select(d => new CodeTypeParameter()
			{
				Name = isClosedGeneric ? customAssembliesSet.GetClientTypeName(d) : d.Name,
			}).ToArray()
			);

			ns.Types.Add(ctd);
			return ctd;
		}

		/// <summary>
		/// Create type as interface in CodeDOM namespace. Basically for TypeScript.
		/// </summary>
		/// <param name="ns"></param>
		/// <param name="type"></param>
		/// <param name="customAssembliesSet"></param>
		/// <returns></returns>
		public static CodeTypeDeclaration CreatePodClientGenericInterface(CodeNamespace ns, Type type, CustomAssembliesSet customAssembliesSet)
		{
			Type genericTypeDefinition = type.GetGenericTypeDefinition();
			Type[] genericArguments = type.GetGenericArguments();
			var isClosedGeneric = !type.IsGenericTypeDefinition;

			string goodGenericClassName = SanitiseGenericClassName(genericTypeDefinition.Name);

			CodeTypeDeclaration ctd = new CodeTypeDeclaration(goodGenericClassName)
			{
				TypeAttributes = TypeAttributes.Public | TypeAttributes.Interface, //setting IsInterface has no use
			};

			ctd.TypeParameters.AddRange(genericArguments.Select(d => new CodeTypeParameter()
			{
				Name = isClosedGeneric ? customAssembliesSet.GetClientTypeName(d) : d.ToString(),
			}).ToArray()
			);


			ns.Types.Add(ctd);
			return ctd;
		}

		/// <summary>
		/// Remove the ` and generic parameter count suffix from generic class name.
		/// </summary>
		/// <param name="s"></param>
		/// <returns></returns>
		static string SanitiseGenericClassName(string s)
		{
			int index = s.IndexOf('`');
			return s.Remove(index);
		}
	}
}
