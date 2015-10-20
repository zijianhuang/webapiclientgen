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
    public sealed class PocoWalker
    {
        //http://www.typescriptlang.org/Handbook#basic-types

        public static void Walk(string assemblyFileName, string tsFileName)
        {
            var absolutePath = System.IO.Path.GetFullPath(assemblyFileName);
            var workdingDir = System.IO.Path.GetDirectoryName(absolutePath);
            Environment.CurrentDirectory = workdingDir;
            var assembly = LoadAssembly(absolutePath);
            if (assembly == null)
                return;

            var typesWithDataContract = GetDataContractTypes(assembly);

            var gen = new TsPodGen();
            gen.Generate(typesWithDataContract);
            gen.SaveTsCode(tsFileName);
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

        static bool IsClassOrStruct(Type type)
        {
            return type.IsClass || (type.IsValueType && !type.IsPrimitive && !type.IsEnum);
        }


    }


}

