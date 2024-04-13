using System.ComponentModel.DataAnnotations;
using System.Net;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace WebApp.Utilities
{
	public class ErrorHandlingMiddleware
	{
		// Thanks to https://stackoverflow.com/questions/38630076/asp-net-core-web-api-exception-handling
		private readonly RequestDelegate next;
		public ErrorHandlingMiddleware(RequestDelegate next, ILogger<ErrorHandlingMiddleware> logger)
		{
			this.next = next;
			this.logger = logger;
		}

		readonly ILogger<ErrorHandlingMiddleware> logger;

		public async Task Invoke(HttpContext context)
		{
			try
			{
				await next(context);
			}
			catch (Exception ex)
			{
				await HandleExceptionAsync(context, ex);
			}
		}

		private async Task HandleExceptionAsync(HttpContext context, Exception ex)
		{
			var endpoint = context.GetEndpoint().DisplayName;
#if DEBUG
			var exceptionErrorMessage = ex.ToString();
#else
			var exceptionErrorMessage = ex.Message;
#endif
			logger.LogError($"Endpoint: {endpoint}; Exception: {exceptionErrorMessage}");

			var code = HttpStatusCode.InternalServerError; // 500 if unexpected
			if (typeof(ArgumentException).IsAssignableFrom(ex.GetType()))
			{
				code = HttpStatusCode.BadRequest;
			}
			else if (typeof(ValidationException).IsAssignableFrom(ex.GetType()))
			{
				code = HttpStatusCode.Conflict;
			}
			else if (typeof(System.Security.Authentication.AuthenticationException).IsAssignableFrom(ex.GetType())) // must go before HttpRequestException. Apparently
			{
				var mcpException = ex as System.Security.Authentication.AuthenticationException;
				code = HttpStatusCode.BadRequest;
				context.Response.StatusCode = (int)code;
				await context.Response.WriteAsync(mcpException.Message);
				return;
			}
			else if (typeof(HttpRequestException).IsAssignableFrom(ex.GetType()))
			{
				code = HttpStatusCode.BadRequest;
			}
			else if (typeof(System.Data.DataException).IsAssignableFrom(ex.GetType()))
			{
				code = HttpStatusCode.Conflict;
			}
			else if (typeof(InvalidOperationException).IsAssignableFrom(ex.GetType()))
			{
				code = HttpStatusCode.InternalServerError;
			}
			//else if (typeof(AppArgumentException).IsAssignableFrom(ex.GetType()))
			//{
			//	code = HttpStatusCode.BadRequest;
			//}
			//else if (typeof(AppException).IsAssignableFrom(ex.GetType()))
			//{
			//	code = HttpStatusCode.InternalServerError;
			//}
			else if (typeof(ArgumentException).IsAssignableFrom(ex.GetType()))
			{
				code = HttpStatusCode.BadRequest;
			}
			else if (typeof(ValidationException).IsAssignableFrom(ex.GetType()))
			{
				code = HttpStatusCode.Conflict;
			}
			else if (typeof(System.Data.DataException).IsAssignableFrom(ex.GetType()))
			{
				code = HttpStatusCode.Conflict;
			}
			else if (typeof(System.Net.Http.HttpRequestException).IsAssignableFrom(ex.GetType()))
			{
				code = HttpStatusCode.BadRequest;
			}
			else if (typeof(InvalidOperationException).IsAssignableFrom(ex.GetType()))
			{
				code = HttpStatusCode.InternalServerError;
			}

			context.Response.ContentType = "text/plain";
			context.Response.StatusCode = (int)code;
			await context.Response.WriteAsync(exceptionErrorMessage);
		}
	}
}
