using System;
using System.Collections.Generic;
using System.Text;

namespace Fonlow.OpenApiClientGen.ClientTypes
{
	public class TypeAliasDic
	{
		Dictionary<string, string> dic = new Dictionary<string, string>();

		private static readonly Lazy<TypeAliasDic>
		lazy =
		new Lazy<TypeAliasDic>
			(() => new TypeAliasDic());

		public static TypeAliasDic Instance { get { return lazy.Value; } }

		private TypeAliasDic()
		{
		}

		public void Add(string alias, string typeName)
		{
			dic.TryAdd(alias, typeName);
		}

		public bool TryGet(string alias, out string typeName)
		{
			return dic.TryGetValue(alias, out typeName);
		}
	}
}

