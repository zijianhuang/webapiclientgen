using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Tavis.UriTemplates
{
	public class UriTemplateTable
	{
		private Dictionary<string,UriTemplate> _Templates =  new Dictionary<string,UriTemplate>();
		
		public void Add(string key, UriTemplate template)
		{
			_Templates.Add(key,template);
		}

		public TemplateMatch Match(Uri url, QueryStringParameterOrder order = QueryStringParameterOrder.Strict)
		{
			foreach (KeyValuePair<string, UriTemplate> template in _Templates )
			{
				IDictionary<string, object> parameters = template.Value.GetParameters(url, order);
				if (parameters != null)
				{
					return new TemplateMatch(template.Key, template.Value, parameters);
				}
			}
			return null;
		}

		public UriTemplate this[string key]
		{
			get
			{
				UriTemplate value;
				if (_Templates.TryGetValue(key, out value))
				{
					return value;
				}
				else {
					return null;
				}
			}
		}

	}

	public class TemplateMatch
	{
		public TemplateMatch(string key, UriTemplate template, IDictionary<string, object> parameters)
		{
			Key = key;
			Template = template;
			Parameters = parameters;
		}

		public string Key { get;  }
		public UriTemplate Template {get;}
		public IDictionary<string,object> Parameters { get;  }
	}
}
