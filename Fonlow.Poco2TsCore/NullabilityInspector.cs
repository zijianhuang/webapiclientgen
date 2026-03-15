using System;
using System.Linq;
using System.Reflection;

namespace Fonlow.Poco2Client
{
	/// <summary>
	/// Utility to inspect C# nullable reference annotations at runtime
	/// using NullabilityInfoContext (NET 5+). AI CodePilot generated
	/// </summary>
	public static class NullabilityInspector
	{
		// Reuse a single context; it's safe to do so.
		private static readonly NullabilityInfoContext _ctx = new();

		// --- Core creators ---
		public static NullabilityInfo For(ParameterInfo parameter) => _ctx.Create(parameter);
		public static NullabilityInfo For(PropertyInfo property) => _ctx.Create(property);
		public static NullabilityInfo For(FieldInfo field) => _ctx.Create(field);
		public static NullabilityInfo ForReturn(MethodInfo method) => _ctx.Create(method.ReturnParameter);

		// --- Convenience checks (top-level nullability) ---
		public static bool IsNullable(ParameterInfo parameter) => For(parameter).ReadState == NullabilityState.Nullable;
		public static bool IsNullable(PropertyInfo property) => For(property).ReadState == NullabilityState.Nullable;
		public static bool IsNullable(FieldInfo field) => For(field).ReadState == NullabilityState.Nullable;
		public static bool IsNullableReturn(MethodInfo method) => ForReturn(method).ReadState == NullabilityState.Nullable;

		// Value type helper (value types carry nullability in their Type: Nullable<T>)
		public static bool IsNullableValueType(Type type) => Nullable.GetUnderlyingType(type) is not null;

		/// <summary>
		/// Dumps a human-readable tree of nullability for a member’s nullability info.
		/// Useful for debugging and seeing nested generic argument states.
		/// </summary>
		public static void Dump(NullabilityInfo info, string indent = "")
		{
			Console.WriteLine($"{indent}{FriendlyName(info.Type)} => Read={info.ReadState}, Write={info.WriteState}");

			// For generic types (e.g., Dictionary<string, SuperHero?>, Task<SuperHero?>, etc.)
			foreach (var (arg, i) in info.GenericTypeArguments.Select((a, i) => (a, i)))
			{
				Console.WriteLine($"{indent}  [TArg#{i}]");
				Dump(arg, indent + "    ");
			}

			// For arrays (e.g., SuperHero?[])
			if (info.ElementType is not null)
			{
				Console.WriteLine($"{indent}  [Element]");
				Dump(info.ElementType, indent + "    ");
			}
		}

		private static string FriendlyName(Type t)
		{
			if (!t.IsGenericType) return t.Name;
			var genArgs = string.Join(", ", t.GetGenericArguments().Select(FriendlyName));
			var tick = t.Name.IndexOf('`');
			var name = tick >= 0 ? t.Name[..tick] : t.Name;
			return $"{name}<{genArgs}>";
		}
	}

}
