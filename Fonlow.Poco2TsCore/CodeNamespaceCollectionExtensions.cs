using System;
using System.CodeDom;

namespace Fonlow.CodeDom
{
	public static class CodeNamespaceCollectionExtensions
	{
		/// <summary>
		/// Inserts a new CodeNamespaceEx with the specified name into the collection, maintaining sorted order, or returns
		/// the existing item if one with the same name already exists.
		/// </summary>
		/// <remarks>If an item with the specified name already exists in the collection, no new item is inserted and
		/// the existing item is returned. The collection is kept in sorted order after insertion. The comparison used for
		/// sorting is determined by the Compare method.</remarks>
		/// <param name="list">The CodeNamespaceCollection to insert into. Must not be null.</param>
		/// <param name="name">The name of the CodeNamespaceEx to insert or locate. Cannot be null.</param>
		/// <param name="dataModelOnly">A value indicating whether the new CodeNamespaceEx should be created as data model only.</param>
		/// <returns>The existing CodeNamespaceEx with the specified name if found; otherwise, the newly inserted CodeNamespaceEx.</returns>
		public static CodeNamespaceEx InsertToSortedCollection(this CodeNamespaceCollection list, string name, bool dataModelOnly) // inspired by Jackson Dunstan, http://JacksonDunstan.com/articles/3189
		{
			int foundIndex = list.FindIndex(name);
			if (foundIndex >= 0)
			{
				var existing = list[foundIndex] as CodeNamespaceEx;
				return existing;
			}

			CodeNamespaceEx newOne = new CodeNamespaceEx(name, dataModelOnly);

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
