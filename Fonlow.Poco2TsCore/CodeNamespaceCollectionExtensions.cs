using System;
using System.CodeDom;

namespace Fonlow.CodeDom
{
	public static class CodeNamespaceCollectionExtensions
	{
		public static CodeNamespaceEx InsertToSortedCollection(this CodeNamespaceCollection list, string name, bool dmOnly) // inspired by Jackson Dunstan, http://JacksonDunstan.com/articles/3189
		{
			int foundIndex = list.FindIndex(name);
			if (foundIndex >= 0)
			{
				var existing = list[foundIndex] as CodeNamespaceEx;
				return existing;
			}

			CodeNamespaceEx newOne = new CodeNamespaceEx(name, dmOnly);

			var startIndex = 0;
			var endIndex = list.Count;
			while (endIndex > startIndex)
			{
				var windowSize = endIndex - startIndex;
				var middleIndex = startIndex + (windowSize / 2);
				var middleValue = list[middleIndex] as CodeNamespaceEx;
				var compareToResult = Compare(middleValue, newOne);
				if (compareToResult == 0)
				{
					list.Insert(middleIndex, newOne);
					return newOne;
				}
				else if (compareToResult < 0)
				{
					startIndex = middleIndex + 1;
				}
				else
				{
					endIndex = middleIndex;
				}
			}

			list.Insert(startIndex, newOne);

			return newOne; ;
		}

		static int Compare(CodeNamespaceEx v1, CodeNamespaceEx v2)
		{
			string f1 = v1.DataModelOnly ? "0_" : "9_";
			string f2 = v2.DataModelOnly ? "0_" : "9_";

			int idx = string.Compare(f1 + v1.Name, f2 + v2.Name, StringComparison.OrdinalIgnoreCase);
			return idx;
		}

		public static int FindIndex(this CodeNamespaceCollection list, string name)
		{
			for (int i = 0; i < list.Count; i++)
			{
				if (list[i].Name == name)
				{
					return i;
				}
			}

			return -1;
		}
	}
}
