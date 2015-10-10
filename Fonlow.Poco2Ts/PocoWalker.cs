using System;
using System.Linq;
using System.Reflection;
using System.Diagnostics;
using System.Runtime.Serialization;

namespace Fonlow.Poco2Ts
{
    /// <summary>
    /// 
    /// </summary>
    public class PocoWalker
    {
        //http://www.typescriptlang.org/Handbook#basic-types

        public static void Walk(string assemblyFileName, string tsFileName)
        {
            var absolutePath = System.IO.Path.GetFullPath(assemblyFileName);
            var assembly = LoadAssembly(absolutePath);
            if (assembly == null)
                return;

            var typesWithDataContract = GetDataContractTypes(assembly);
            foreach (var type in typesWithDataContract)
            {
                WalkDataContactType(type);
            }
        }

        static Assembly LoadAssembly(string assemblyFileName)
        {
            try
            {
                return Assembly.LoadFile(assemblyFileName);
            }
            catch (System.IO.FileLoadException e)
            {
                Trace.TraceWarning(String.Format("When loading {0}, errors occur: {1}", assemblyFileName, e.Message));
                return null;
            }
            catch (BadImageFormatException e)
            {
                Trace.TraceWarning(String.Format("When loading {0}, errors occur: {1}", assemblyFileName, e.Message));
                //when file is a win32 dll.
                return null;
            }
            catch (System.IO.FileNotFoundException e)
            {
                Trace.TraceWarning(String.Format("When loading {0}, errors occur: {1}", assemblyFileName, e.Message));
                return null;
            }
            catch (ArgumentException e)
            {
                Trace.TraceWarning(String.Format("When loading {0}, errors occur: {1}", assemblyFileName, e.Message));
                return null;
            }

        }

        static bool IsClassOrStruct(Type type)
        {
            return type.IsClass || (type.IsValueType && !type.IsPrimitive && !type.IsEnum);
        }

        static Type[] GetDataContractTypes(Assembly assembly)
        {
            try
            {
                return assembly.GetTypes().Where(type => (IsClassOrStruct(type) || type.IsEnum)  
                && (PropertyHelper.ReadAttribute<DataContractAttribute>(type) != null)).ToArray();
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

        static void WalkDataContactType(Type type)
        {
            var dataContractAttribute = PropertyHelper.ReadAttribute<DataContractAttribute>(type);
            Trace.Assert(dataContractAttribute != null);

            var tsName = String.IsNullOrEmpty(dataContractAttribute.Name) ? type.Name : dataContractAttribute.Name;
            var tsNamespace = type.Namespace;
            Debug.WriteLine("tsClass: " + tsNamespace + "  " + tsName);

            if (IsClassOrStruct(type))
            {
                foreach (var propertyInfo in type.GetProperties())
                {
                    string tsPropertyName;
                    var dataMemberAttribute = PropertyHelper.ReadAttribute<DataMemberAttribute>(propertyInfo);
                    if (dataMemberAttribute != null)
                    {
                        tsPropertyName = String.IsNullOrEmpty(dataMemberAttribute.Name) ? propertyInfo.Name : dataMemberAttribute.Name;
                        Debug.WriteLine(String.Format("{0} : {1}", tsPropertyName, propertyInfo.PropertyType.Name));
                    }
                    //else
                    // todo: support EnumMemberAttribute later
                    //    var enumMemberAttribute = PropertyHelper.ReadAttribute<EnumMemberAttribute>(property);
                    //    if (enumMemberAttribute!=null)
                    //    {
                    //        tsPropertyName = String.IsNullOrEmpty(enumMemberAttribute.) ? property.Name : enumMemberAttribute.Name;
                    //    }
                    //}
                }

                foreach (var fieldInfo in type.GetFields().Where(d => d.IsPublic))
                {
                    string tsPropertyName;
                    var dataMemberAttribute = PropertyHelper.ReadAttribute<DataMemberAttribute>(fieldInfo);
                    if (dataMemberAttribute != null)
                    {
                        tsPropertyName = String.IsNullOrEmpty(dataMemberAttribute.Name) ? fieldInfo.Name : dataMemberAttribute.Name;
                        Debug.WriteLine(String.Format("{0} : {1}", tsPropertyName, fieldInfo.FieldType.Name));
                    }
                }
            }
            else if (type.IsEnum)
            {
                foreach (var fieldInfo in type.GetFields(BindingFlags.Public | BindingFlags.Static))
                {
                    var name = fieldInfo.Name;
                    var ulongValue = (ulong)Convert.ChangeType(fieldInfo.GetValue(null), typeof(ulong));
                    Debug.WriteLine(name + " -- " + ulongValue);
                }

            }
            else
            {
                Trace.TraceWarning("Not yet supported: " + type.Name);
            }
        }
    }


}

