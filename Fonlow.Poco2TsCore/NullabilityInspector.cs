using System;
using System.Reflection;

namespace Fonlow.Poco2Client
{
	/// <summary>
	/// Utility to inspect C# nullable reference annotations at runtime
	/// using NullabilityInfoContext (NET 5+).
	/// </summary>
	/// <remarks>AI CodePilot generated</remarks>
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
	}

}
