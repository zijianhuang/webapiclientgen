//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Text.RegularExpressions;

//namespace Tavis.UriTemplates
//{
//	using System;
//	using System.Collections;
//	using System.Collections.Generic;
//#if TYPE_CONVERTER
//	using System.ComponentModel;
//#endif
//	using System.Linq;
//	using System.Text;

//#if TYPE_CONVERTER
//	[TypeConverter(typeof(UriTemplateConverter))]
//#endif
//	public class UriTemplate
//	{


//		private static Dictionary<char, OperatorInfo> _Operators = new Dictionary<char, OperatorInfo>() {
//										{'\0', new OperatorInfo {Default = true, First = "", Separator = ',', Named = false, IfEmpty = "",AllowReserved = false}},
//										{'+', new OperatorInfo {Default = false, First = "", Separator = ',', Named = false, IfEmpty = "",AllowReserved = true}},
//										{'.', new OperatorInfo {Default = false, First = ".", Separator = '.', Named = false, IfEmpty = "",AllowReserved = false}},
//										{'/', new OperatorInfo {Default = false, First = "/", Separator = '/', Named = false, IfEmpty = "",AllowReserved = false}},
//										{';', new OperatorInfo {Default = false, First = ";", Separator = ';', Named = true, IfEmpty = "",AllowReserved = false}},
//										{'?', new OperatorInfo {Default = false, First = "?", Separator = '&', Named = true, IfEmpty = "=",AllowReserved = false}},
//										{'&', new OperatorInfo {Default = false, First = "&", Separator = '&', Named = true, IfEmpty = "=",AllowReserved = false}},
//										{'#', new OperatorInfo {Default = false, First = "#", Separator = ',', Named = false, IfEmpty = "",AllowReserved = true}}
//										};

//		private readonly string _template;
//		private readonly Dictionary<string, object> _Parameters;
//		private enum States { CopyingLiterals, ParsingExpression }


//		private readonly bool _resolvePartially;

//		public UriTemplate(string template, bool resolvePartially = false, bool caseInsensitiveParameterNames = false)
//		{
//			_resolvePartially = resolvePartially;
//			_template = template;
//			_Parameters = caseInsensitiveParameterNames
//				? new Dictionary<string, object>(StringComparer.OrdinalIgnoreCase)
//				: new Dictionary<string, object>();
//		}

//		public override string ToString()
//		{
//			return _template;
//		}

//		public void SetParameter(string name, object value)
//		{
//			_Parameters[name] = value;
//		}

//		public void ClearParameter(string name)
//		{
//			_Parameters.Remove(name);
//		}

//		public void SetParameter(string name, string value)
//		{
//			_Parameters[name] = value;
//		}

//		public void SetParameter(string name, IEnumerable<string> value)
//		{
//			_Parameters[name] = value;
//		}

//		public void SetParameter(string name, IDictionary<string, string> value)
//		{
//			_Parameters[name] = value;
//		}

//		public IEnumerable<string> GetParameterNames()
//		{
//			Result result = ResolveResult();
//			return result.ParameterNames;
//		}

//		public string Resolve()
//		{
//			Result result = ResolveResult();
//			return result.ToString();
//		}

//		private Result ResolveResult()
//		{
//			States currentState = States.CopyingLiterals;
//			Result result = new Result();
//			StringBuilder currentExpression = null;
//			foreach (char character in _template.ToCharArray())
//			{
//				switch (currentState)
//				{
//					case States.CopyingLiterals:
//						if (character == '{')
//						{
//							currentState = States.ParsingExpression;
//							currentExpression = new StringBuilder();
//						}
//						else if (character == '}')
//						{
//							throw new ArgumentException("Malformed template, unexpected } : " + result.ToString());
//						}
//						else
//						{
//							result.Append(character);
//						}
//						break;
//					case States.ParsingExpression:
//						if (character == '}')
//						{
//							ProcessExpression(currentExpression, result);

//							currentState = States.CopyingLiterals;
//						}
//						else
//						{
//							currentExpression.Append(character);
//						}

//						break;
//				}
//			}
//			if (currentState == States.ParsingExpression)
//			{
//				result.Append("{");
//				result.Append(currentExpression.ToString());

//				throw new ArgumentException("Malformed template, missing } : " + result.ToString());
//			}

//			if (result.ErrorDetected)
//			{
//				throw new ArgumentException("Malformed template : " + result.ToString());
//			}
//			return result;
//		}

//		private void ProcessExpression(StringBuilder currentExpression, Result result)
//		{

//			if (currentExpression.Length == 0)
//			{
//				result.ErrorDetected = true;
//				result.Append("{}");
//				return;
//			}

//			OperatorInfo op = GetOperator(currentExpression[0]);

//			int firstChar = op.Default ? 0 : 1;
//			bool multivariableExpression = false;

//			VarSpec varSpec = new VarSpec(op);
//			for (int i = firstChar; i < currentExpression.Length; i++)
//			{
//				char currentChar = currentExpression[i];
//				switch (currentChar)
//				{
//					case '*':
//						varSpec.Explode = true;
//						break;

//					case ':':  // Parse Prefix Modifier
//						StringBuilder prefixText = new StringBuilder();
//						currentChar = currentExpression[++i];
//						while (currentChar >= '0' && currentChar <= '9' && i < currentExpression.Length)
//						{
//							prefixText.Append(currentChar);
//							i++;
//							if (i < currentExpression.Length) currentChar = currentExpression[i];
//						}
//						varSpec.PrefixLength = int.Parse(prefixText.ToString());
//						i--;
//						break;

//					case ',':
//						multivariableExpression = true;
//						bool success = ProcessVariable(varSpec, result, multivariableExpression);
//						bool isFirst = varSpec.First;
//						// Reset for new variable
//						varSpec = new VarSpec(op);
//						if (success || !isFirst || _resolvePartially) varSpec.First = false;
//						if (!success && _resolvePartially) { result.Append(","); }
//						break;


//					default:
//						if (IsVarNameChar(currentChar))
//						{
//							varSpec.VarName.Append(currentChar);
//						}
//						else
//						{
//							result.ErrorDetected = true;
//						}
//						break;
//				}
//			}

//			ProcessVariable(varSpec, result, multivariableExpression);
//			if (multivariableExpression && _resolvePartially) result.Append("}");
//		}

//		private bool ProcessVariable(VarSpec varSpec, Result result, bool multiVariableExpression = false)
//		{
//			string varname = varSpec.VarName.ToString();
//			result.ParameterNames.Add(varname);

//			if (!_Parameters.TryGetValue(varname, out object value) || value == null
//				|| (value is IList && ((IList)value).Count == 0)
//				|| (value is IDictionary && ((IDictionary)value).Count == 0))
//			{
//				if (_resolvePartially == true)
//				{
//					if (multiVariableExpression)
//					{
//						if (varSpec.First)
//						{
//							result.Append("{");
//						}

//						result.Append(varSpec.ToString());
//					}
//					else
//					{
//						result.Append("{");
//						result.Append(varSpec.ToString());
//						result.Append("}");
//					}
//					return false;
//				}
//				return false;
//			}

//			if (varSpec.First)
//			{
//				result.Append(varSpec.OperatorInfo.First);
//			}
//			else
//			{
//				result.Append(varSpec.OperatorInfo.Separator);
//			}

//			object v = value;

//			// Handle Strings
//			if (v is string)
//			{
//				string stringValue = (string)v;
//				if (varSpec.OperatorInfo.Named)
//				{
//					result.AppendName(varname, varSpec.OperatorInfo, string.IsNullOrEmpty(stringValue));
//				}
//				result.AppendValue(stringValue, varSpec.PrefixLength, varSpec.OperatorInfo.AllowReserved);
//			}
//			else
//			{
//				// Handle Lists
//				IList list = v as IList;
//				if (list == null && v is IEnumerable<string>)
//				{
//					list = ((IEnumerable<string>)v).ToList<string>();
//				};
//				if (list != null)
//				{
//					if (varSpec.OperatorInfo.Named && !varSpec.Explode)  // exploding will prefix with list name
//					{
//						result.AppendName(varname, varSpec.OperatorInfo, list.Count == 0);
//					}

//					result.AppendList(varSpec.OperatorInfo, varSpec.Explode, varname, list);
//				}
//				else
//				{

//					// Handle associative arrays
//					IDictionary<string, string> dictionary = v as IDictionary<string, string>;
//					if (dictionary != null)
//					{
//						if (varSpec.OperatorInfo.Named && !varSpec.Explode)  // exploding will prefix with list name
//						{
//							result.AppendName(varname, varSpec.OperatorInfo, dictionary.Count == 0);
//						}
//						result.AppendDictionary(varSpec.OperatorInfo, varSpec.Explode, dictionary);
//					}
//					else
//					{
//						// If above all fails, convert the object to string using the default object.ToString() implementation
//						string stringValue = v.ToString();
//						if (varSpec.OperatorInfo.Named)
//						{
//							result.AppendName(varname, varSpec.OperatorInfo, string.IsNullOrEmpty(stringValue));
//						}
//						result.AppendValue(stringValue, varSpec.PrefixLength, varSpec.OperatorInfo.AllowReserved);
//					}

//				}

//			}
//			return true;
//		}

//		private static bool IsVarNameChar(char c)
//		{
//			return ((c >= 'A' && c <= 'z') //Alpha
//					|| (c >= '0' && c <= '9') // Digit
//					|| c == '_'
//					|| c == '%'
//					|| c == '.');
//		}

//		private static OperatorInfo GetOperator(char operatorIndicator)
//		{
//			OperatorInfo op;
//			switch (operatorIndicator)
//			{

//				case '+':
//				case ';':
//				case '/':
//				case '#':
//				case '&':
//				case '?':
//				case '.':
//					op = _Operators[operatorIndicator];
//					break;

//				default:
//					op = _Operators['\0'];
//					break;
//			}
//			return op;
//		}

//		private const string varname = "[a-zA-Z0-9_]*";
//		private const string op = "(?<op>[+#./;?&]?)";
//		private const string var = "(?<var>(?:(?<lvar>" + varname + ")[*]?,?)*)";
//		private const string varspec = "(?<varspec>{" + op + var + "})";

//		// (?<varspec>{(?<op>[+#./;?&]?)(?<var>[a-zA-Z0-9_]*[*]?|(?:(?<lvar>[a-zA-Z0-9_]*[*]?),?)*)})

//		private Regex _ParameterRegex;

//		private Uri _ComponentBaseUri = new Uri("https://localhost.com", UriKind.Absolute);

//		private static object _syncRoot = new object();

//		public IDictionary<string, object> GetParameters(Uri uri, QueryStringParameterOrder order = QueryStringParameterOrder.Strict)
//		{
//			switch (order)
//			{
//				case QueryStringParameterOrder.Strict:
//					{
//						if (_ParameterRegex == null)
//						{
//							string matchingRegex = CreateMatchingRegex(_template);
//							lock (_syncRoot)
//							{
//								_ParameterRegex = new Regex(matchingRegex);
//							}
//						}

//						Match match = _ParameterRegex.Match(uri.OriginalString);
//						Dictionary<string, object> parameters = new Dictionary<string, object>();

//						for (int x = 1; x < match.Groups.Count; x++)
//						{
//							if (match.Groups[x].Success)
//							{
//								string paramName = _ParameterRegex.GroupNameFromNumber(x);
//								if (!string.IsNullOrEmpty(paramName))
//								{
//									parameters.Add(paramName, Uri.UnescapeDataString(match.Groups[x].Value));
//								}

//							}
//						}
//						return match.Success ? parameters : null;
//					}
//				case QueryStringParameterOrder.Any:
//					{
//						if (!uri.IsAbsoluteUri)
//							uri = new Uri(_ComponentBaseUri, uri);

//						string uriString = uri.GetComponents(UriComponents.SchemeAndServer | UriComponents.Path | UriComponents.Fragment, UriFormat.UriEscaped);
//						Uri uriWithoutQuery = new Uri(uriString, UriKind.Absolute);

//						IDictionary<string, object> pathParameters = GetParameters(uriWithoutQuery) ?? new Dictionary<string, object>(_Parameters.Comparer);

//						Result result = ResolveResult();

//						IList<string> parameterNames = result.ParameterNames;
//						foreach (KeyValuePair<string, object> parameter in uri.GetQueryStringParameters())
//						{
//							if (!parameterNames.Contains(parameter.Key))
//								continue;
//							pathParameters.Add(parameter.Key, parameter.Value);
//						}

//						return pathParameters.Count == 0 ? null : pathParameters;
//					}
//				default:
//					throw new ArgumentOutOfRangeException(nameof(order), order, null);
//			}
//		}

//		public static string CreateMatchingRegex(string uriTemplate)
//		{
//			Regex findParam = new Regex(varspec);

//			string template = new Regex(@"([^{]|^)\?").Replace(uriTemplate, @"$+\?"); ;//.Replace("?",@"\?");
//			string regex = findParam.Replace(template, delegate (Match m)
//			{
//				List<string> paramNames = m.Groups["lvar"].Captures.Cast<Capture>().Where(c => !string.IsNullOrEmpty(c.Value)).Select(c => c.Value).ToList();
//				string op = m.Groups["op"].Value;
//				switch (op)
//				{
//					case "?":
//						return GetQueryExpression(paramNames, prefix: "?");
//					case "&":
//						return GetQueryExpression(paramNames, prefix: "&");
//					case "#":
//						return GetExpression(paramNames, prefix: "#");
//					case "/":
//						return GetExpression(paramNames, prefix: "/");

//					case "+":
//						return GetExpression(paramNames);
//					default:
//						return GetExpression(paramNames);
//				}

//			});

//			return regex + "$";
//		}

//		public static string CreateMatchingRegex2(string uriTemplate)
//		{
//			Regex findParam = new Regex(varspec);
//			//split by host/path/query/fragment

//			string template = new Regex(@"([^{]|^)\?").Replace(uriTemplate, @"$+\?"); ;//.Replace("?",@"\?");
//			string regex = findParam.Replace(template, delegate (Match m)
//			{
//				List<string> paramNames = m.Groups["lvar"].Captures.Cast<Capture>().Where(c => !string.IsNullOrEmpty(c.Value)).Select(c => c.Value).ToList();
//				string op = m.Groups["op"].Value;
//				switch (op)
//				{
//					case "?":
//						return GetQueryExpression(paramNames, prefix: "?");
//					case "&":
//						return GetQueryExpression(paramNames, prefix: "&");
//					case "#":
//						return GetExpression(paramNames, prefix: "#");
//					case "/":
//						return GetExpression(paramNames, prefix: "/");

//					case "+":
//						return GetExpression(paramNames);
//					default:
//						return GetExpression(paramNames);
//				}

//			});

//			return regex + "$";
//		}

//		private static string GetQueryExpression(List<String> paramNames, string prefix)
//		{
//			StringBuilder sb = new StringBuilder();
//			foreach (string paramname in paramNames)
//			{

//				sb.Append(@"\" + prefix + "?");
//				if (prefix == "?") prefix = "&";

//				sb.Append("(?:");
//				sb.Append(paramname);
//				sb.Append('=');

//				sb.Append("(?<");
//				sb.Append(paramname);
//				sb.Append('>');
//				sb.Append("[^/?&]+");
//				sb.Append(')');
//				sb.Append(")?");
//			}

//			return sb.ToString();
//		}


//		private static string GetExpression(List<String> paramNames, string prefix = null)
//		{
//			StringBuilder sb = new StringBuilder();

//			string paramDelim;

//			switch (prefix)
//			{
//				case "#":
//					paramDelim = "[^,]+";
//					break;
//				case "/":
//					paramDelim = "[^/?]+";
//					break;
//				case "?":
//				case "&":
//					paramDelim = "[^&#]+";
//					break;
//				case ";":
//					paramDelim = "[^;/?#]+";
//					break;
//				case ".":
//					paramDelim = "[^./?#]+";
//					break;

//				default:
//					paramDelim = "[^/?&]+";
//					break;

//			}

//			foreach (string paramname in paramNames)
//			{
//				if (string.IsNullOrEmpty(paramname)) continue;

//				if (prefix != null)
//				{
//					sb.Append(@"\" + prefix + "?");
//					if (prefix == "#") { prefix = ","; }
//				}
//				sb.Append("(?<");
//				sb.Append(paramname);
//				sb.Append('>');
//				sb.Append(paramDelim); // Param Value
//				sb.Append(")?");
//			}

//			return sb.ToString();
//		}


//	}


//}
