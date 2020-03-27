using System;
using System.CodeDom;
using System.IO;
using System.Reflection;

namespace Fonlow.Poco2Client
{
    public interface IPoco2Client
    {
        void CreateCodeDom(Type[] types, CherryPickingMethods methods, string clientNamespaceSuffix);
        void CreateCodeDom(Assembly assembly, CherryPickingMethods methods, Fonlow.DocComment.DocCommentLookup docLookup, string clientNamespaceSuffix, bool dataAnnotationsToComments);
        void SaveCodeToFile(string fileName);
        CodeTypeReference TranslateToClientTypeReference(Type type);
 
        /// <summary>
        /// Initialize a CodeDOM provider which write CodeDOM to TextWriter
        /// </summary>
        /// <param name="writer"></param>
        void WriteCode(TextWriter writer);
    }
}