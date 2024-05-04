using System;
using System.CodeDom;

namespace Fonlow.CodeDom
{
	public static class CodeNamespaceCollectionExtensions
	{
		public static void InsertToSortedCollection(this CodeNamespaceCollection list, CodeNamespaceEx value) // inspired by Jackson Dunstan, http://JacksonDunstan.com/articles/3189
		{
			var startIndex = 0;
			var endIndex = list.Count;
			while (endIndex > startIndex)
			{
				var windowSize = endIndex - startIndex;
				var middleIndex = startIndex + (windowSize / 2);
				var middleValue = list[middleIndex] as CodeNamespaceEx;
				var compareToResult = Compare(middleValue, value);
				if (compareToResult == 0)
				{
					list.Insert(middleIndex, value);
					return;
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
			list.Insert(startIndex, value);
		}

		static int Compare(CodeNamespaceEx v1, CodeNamespaceEx v2)
		{
			string f1 = v1.DataModelOnly ? "0" : "9";
			string f2 = v2.DataModelOnly ? "0" : "9";
			
			int idx = string.Compare(f1+ v1.Name, f2+ v2.Name, StringComparison.OrdinalIgnoreCase);
			return idx;
		}

	}
}
