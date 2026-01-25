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

		public static CodeTypeDeclaration CreatePodClientClass(CodeNamespace ns, string className)
		{
			CodeTypeDeclaration targetClass = new CodeTypeDeclaration(className)
			{
				TypeAttributes = TypeAttributes.Public | TypeAttributes.Class, //setting IsInterface has no use
			};

			ns.Types.Add(targetClass);
			return targetClass;
		}

		/// <summary>
		/// Add type to namespace of CodeDOM.
		/// </summary>
		/// <param name="ns"></param>
		/// <param name="type"></param>
		/// <returns></returns>
		public static CodeTypeDeclaration CreatePodClientGenericClass(CodeNamespace ns, Type type)
		{
			Type genericTypeDefinition = type.GetGenericTypeDefinition();
			Type[] genericArguments = type.GetGenericArguments();

			string goodGenericClassName = SanitiseGenericClassName(genericTypeDefinition.Name);

			CodeTypeDeclaration targetClass = new CodeTypeDeclaration(goodGenericClassName)
			{
				TypeAttributes = TypeAttributes.Public | TypeAttributes.Class, //setting IsInterface has no use
			};

			targetClass.TypeParameters.AddRange(genericArguments.Select(d => new CodeTypeParameter()
			{
				Name = d.ToString(),
			}).ToArray()
			);

			ns.Types.Add(targetClass);
			return targetClass;
		}

		/// <summary>
		/// Creates a new CodeDOM type declaration for a JSON serializer context class that derives from JsonSerializerContext
		/// and registers the specified class names.
		/// </summary>
		/// <remarks>The generated class is named "AppJsonSerializerContext" and is marked as public. It derives from
		/// System.Text.Json.Serialization.JsonSerializerContext and includes custom attributes for each specified class
		/// name.</remarks>
		/// <param name="ns">The CodeNamespace to which the generated serializer context class will be added.</param>
		/// <param name="classNames">An array of class names to be registered with the serializer context. Each name represents a type to be included
		/// in the generated context.</param>
		/// <returns>A CodeTypeDeclaration representing the generated serializer context class, ready to be added to the provided
		/// namespace.</returns>
		public static CodeTypeDeclaration CreateJsonSerializerContext(CodeNamespace ns, string[] classNames)
		{
			var namespaceTranslated = ns.Name.Replace(".", "_");
			CodeTypeDeclaration targetClass = new CodeTypeDeclaration(namespaceTranslated +"JsonSerializerContext")
			{
				TypeAttributes = TypeAttributes.Public | TypeAttributes.Class, //setting IsInterface has no use
				IsPartial = true
			};

			targetClass.BaseTypes.Add("System.Text.Json.Serialization.JsonSerializerContext");

			targetClass.CustomAttributes.AddRange(classNames.Select(d=>
			{
				var a = new CodeAttributeDeclaration($"System.Text.Json.Serialization.JsonSerializable");
				a.Arguments.Add(new CodeAttributeArgument(new CodeSnippetExpression($"typeof({d})")));
				return a;
			}).ToArray());
			ns.Types.Add(targetClass);
			return targetClass;
		}

		public static CodeTypeDeclaration CreatePodClientStruct(CodeNamespace ns, string className)
		{
			CodeTypeDeclaration targetClass = new CodeTypeDeclaration(className)
			{
				TypeAttributes = TypeAttributes.Public,
				IsStruct = true
			};

			ns.Types.Add(targetClass);
			return targetClass;
		}

		public static CodeTypeDeclaration CreatePodClientInterface(CodeNamespace ns, string className)
		{
			CodeTypeDeclaration targetClass = new CodeTypeDeclaration(className)
			{
				TypeAttributes = TypeAttributes.Public | TypeAttributes.Interface, //setting IsInterface has no use
			};

			ns.Types.Add(targetClass);
			return targetClass;
		}

		public static CodeTypeDeclaration CreatePodClientGenericInterface(CodeNamespace ns, Type type)
		{
			Type genericTypeDefinition = type.GetGenericTypeDefinition();
			Type[] genericArguments = type.GetGenericArguments();

			string goodGenericClassName = SanitiseGenericClassName(genericTypeDefinition.Name);

			CodeTypeDeclaration targetClass = new CodeTypeDeclaration(goodGenericClassName)
			{
				TypeAttributes = TypeAttributes.Public | TypeAttributes.Interface, //setting IsInterface has no use
			};

			targetClass.TypeParameters.AddRange(genericArguments.Select(d => new CodeTypeParameter()
			{
				Name = d.ToString(),
			}).ToArray()
			);


			ns.Types.Add(targetClass);
			return targetClass;
		}

		static string SanitiseGenericClassName(string s)
		{
			int index = s.IndexOf('`');
			return s.Remove(index);
		}
	}
}
