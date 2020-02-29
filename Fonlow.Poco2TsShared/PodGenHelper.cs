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
	public class PodGenHelper
	{
		public static CodeTypeDeclaration CreatePodClientEnum(CodeNamespace ns, string className)
		{
			var targetClass = new CodeTypeDeclaration(className)
			{
				IsEnum = true,
			};

			ns.Types.Add(targetClass);
			return targetClass;
		}

		public static Type[] GetCherryTypes(Assembly assembly, CherryPickingMethods methods)
		{
			try
			{
				return assembly.GetTypes().Where(type => (TypeHelper.IsClassOrStruct(type) || type.IsEnum)
				&& CherryPicking.IsCherryType(type, methods)).ToArray();
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

		public static CodeTypeDeclaration CreatePodClientClass(CodeNamespace ns, string className)
		{
			var targetClass = new CodeTypeDeclaration(className)
			{
				TypeAttributes = TypeAttributes.Public | TypeAttributes.Class, //setting IsInterface has no use
			};

			ns.Types.Add(targetClass);
			return targetClass;
		}

		public static CodeTypeDeclaration CreatePodClientGenericClass(CodeNamespace ns, Type type)
		{
			Type genericTypeDefinition = type.GetGenericTypeDefinition();
			Type[] genericArguments = type.GetGenericArguments();

			var goodGenericClassName = SanitiseGenericClassName(genericTypeDefinition.Name);

			var targetClass = new CodeTypeDeclaration(goodGenericClassName)
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

		public static CodeTypeDeclaration CreatePodClientStruct(CodeNamespace ns, string className)
		{
			var targetClass = new CodeTypeDeclaration(className)
			{
				TypeAttributes = TypeAttributes.Public, 
				IsStruct=true
			};

			ns.Types.Add(targetClass);
			return targetClass;
		}

		public static CodeTypeDeclaration CreatePodClientInterface(CodeNamespace ns, string className)
		{
			var targetClass = new CodeTypeDeclaration(className)
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

			var goodGenericClassName = SanitiseGenericClassName(genericTypeDefinition.Name);

			var targetClass = new CodeTypeDeclaration(goodGenericClassName)
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
			var index = s.IndexOf('`');
			return s.Remove(index);
		}
	}
}
