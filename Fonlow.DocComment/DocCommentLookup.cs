using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Serialization;
using System.Diagnostics;

namespace Fonlow.DocComment
{
    public class DocCommentLookup
    {
        public DocCommentLookup()
        {

        }

        public doc XmlDoc { get; private set; }

        public bool Load(string filePath)
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

        public docMember GetMember(string name)
        {
            return XmlDoc.members.SingleOrDefault(d => d.name == name);
        }
    }
}
