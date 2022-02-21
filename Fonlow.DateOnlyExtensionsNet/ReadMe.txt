Similar to Fonlow.DateOnlyExtensions but without using NewtonSoft.Json.
Apparently System.Text.Json and ASP.NET Core 6 are still lack of many features:
1. Special types like dynamic.
2. For nullable built-in struct like DateTime, DateTimeOffset and DateOnly, the controller could not pick the right converter for null value to be returned, although the controller could pick the right one for query and post body.

Let's see if ASP.NET Core 7 could be better.