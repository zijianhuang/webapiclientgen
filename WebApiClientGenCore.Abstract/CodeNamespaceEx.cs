using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.CodeDom;
using System.Diagnostics.CodeAnalysis;

namespace Fonlow.CodeDom
{
	public class CodeNamespaceEx : CodeNamespace
	{
		public bool DataModelOnly { get; private set; }

		public CodeNamespaceEx(string name, bool dataModelOnly): base(name)
		{
			DataModelOnly= dataModelOnly;
		}
	}

	public class CodenamespaceComparer : IEqualityComparer<CodeNamespaceEx>
	{
		public bool Equals(CodeNamespaceEx x, CodeNamespaceEx y)
		{
			return x.Name==y.Name && x.DataModelOnly==y.DataModelOnly;	
		}

		public int GetHashCode([DisallowNull] CodeNamespaceEx obj)
		{
			if (Object.ReferenceEquals(obj, null)) return 0;

			int hashProductName = obj.Name == null ? 0 : obj.Name.GetHashCode();

			//Get hash code for the Code field.
			int hashProductCode = obj.DataModelOnly.GetHashCode();

			//Calculate the hash code for the product.
			return hashProductName ^ hashProductCode;
		}
	}
}
