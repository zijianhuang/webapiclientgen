using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Serialization;
using System.Diagnostics;
using System.IO;
using System.Reflection;

namespace Fonlow.DocComment
{
    /// <summary>
    /// Lookup doc comment stored in an XML file.
    /// </summary>
    public class DocCommentLookup
    {
        private DocCommentLookup()
        {

        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="filePath">XML file of doc comment.</param>
        /// <returns></returns>
        public static DocCommentLookup Create(string filePath)
        {
            var lookup = new DocCommentLookup();
            var r = lookup.Load(filePath);
            if (r)
            {
                return lookup;
            }

            return null;
        }

        public doc XmlDoc { get; private set; }

        bool Load(string filePath)
        {
            XmlSerializer serializer = new XmlSerializer(typeof(doc));
            try
            {
                using (var fs = new System.IO.FileStream(filePath, System.IO.FileMode.Open, System.IO.FileAccess.Read))
                {
                    XmlDoc = serializer.Deserialize(fs) as doc;
                    System.Diagnostics.Debug.Assert(XmlDoc != null);
                    return true;
                }

            }
            catch (Exception ex) when (ex is ArgumentException || ex is System.IO.IOException || ex is System.Security.SecurityException)
            {
                Trace.TraceError(ex.ToString());
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

        public static string GetXmlPath(Assembly assembly)
        {
            var assemblyName = assembly.GetName().Name;
            var dirName = GetAssemblyDirectory(assembly);
            return Path.Combine(dirName, assemblyName + ".xml");
        }

        static string GetAssemblyDirectory(Assembly assembly)
        {
            string codeBase = assembly.CodeBase;
            UriBuilder uri = new UriBuilder(codeBase);
            string path = Uri.UnescapeDataString(uri.Path);
            return Path.GetDirectoryName(path);
        }


    }
}
