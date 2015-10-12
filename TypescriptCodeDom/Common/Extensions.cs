namespace TypescriptCodeDom.Common
{
    public static class Extensions
    {
        public static string ConvertPascalCaseToCamelCase(this string name)
        {
            if (string.IsNullOrWhiteSpace(name))
                return string.Empty;

            var firstChar = name[0].ToString().ToLower();

            return $"{firstChar}{name.Substring(1, name.Length - 1)}";
        }

    }
}
