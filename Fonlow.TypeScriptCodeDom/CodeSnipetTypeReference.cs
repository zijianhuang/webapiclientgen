namespace Fonlow.TypeScriptCodeDom
{
    /// <summary>
    /// Support code snipet as BaseType.
    /// CodeTypeReference seems to have a bug which could not read such callbackType properly with 5 or more Tuple parameters.
    /// I tried provide callbackTypeText in constructors of CodeTypeReference and CodeParrameterDeclarationExpression, as well as property assignment.
    /// all end up with "(string ", corrupted.
    /// So this class is a hack against the possible bug of CodeTypeReference in dealing with Tuple
    /// </summary>
    /// <remarks>
    /// CodeTypeReference will fail at these 2 forms of Tuple
    /// callback: (data : {Item1:string, Item2:string, Item3:string, Item4:string, Item5:number}
    /// callback: (data : [string, string, string, string, number])
    /// </remarks>
    public sealed class CodeSnipetTypeReference : System.CodeDom.CodeTypeReference
    {
        public CodeSnipetTypeReference(string typeName)
        {
            BaseType = typeName;
        }

        /// <summary>
        /// Hide the BaseType of CodeTypeReference
        /// </summary>
        /// <remarks>The new keyword could not entirely hide the ancestor's BaseType, but at least stop the BaseType assignment from being refined by CodeTypeRefernce's built-in parser.</remarks>
        public new string BaseType { get; private set; }
    }

}
