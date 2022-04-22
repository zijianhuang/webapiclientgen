using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Fonlow.DateOnlyExtensions;
//using Fonlow.Text.Json.DateOnlyExtensions;

namespace DemoCoreWeb
{
	public class Startup
	{
		public Startup(IConfiguration configuration)
		{
			Configuration = configuration;
		}

		public IConfiguration Configuration { get; }

		public void ConfigureServices(IServiceCollection services)
		{
			services.AddControllers(
				options =>
				{
					//options.OutputFormatters by default includes: HttpNoContent, String, Stream, SystemTextJson
#if DEBUG
					options.Conventions.Add(new Fonlow.CodeDom.Web.ApiExplorerVisibilityEnabledConvention());//To make ApiExplorer be visible to WebApiClientGen

#endif
				}
			)
			//.AddJsonOptions(//revisit this in .NET 7
			//options =>
			//{
			//	options.JsonSerializerOptions.Converters.Add(new DateOnlyJsonConverter());
			//	options.JsonSerializerOptions.Converters.Add(new DateOnlyNullableJsonConverter());

			//});
			.AddNewtonsoftJson(
				options =>
				{
					options.SerializerSettings.DateParseHandling = Newtonsoft.Json.DateParseHandling.DateTimeOffset; //Better with this for cross-timezone minValue and .NET Framework clients.
					options.SerializerSettings.NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore; //So when controller will ignore null fileds when returing data
					options.SerializerSettings.Converters.Add(new DateOnlyJsonConverter());
					options.SerializerSettings.Converters.Add(new DateOnlyNullableJsonConverter());
				}
			);//needed for some special data types which .net core 3.x json lib could not handle well.

			services.AddRouting();
			services.AddCors();
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
		{
			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
			}

			app.UseRouting();
			app.UseCors(builder => builder.AllowAnyOrigin()
				.AllowAnyHeader().AllowAnyMethod()
				);
			app.UseEndpoints(endpoints =>
			{
				endpoints.MapControllers();
			});
#if DEBUG  // This is for running the QUnit cases with tests.html. The CodeGenSetting should be "TypeScriptJQFolder": "..\\..\\..\\Scripts\\ClientApi" without StaticFiles
			app.UseStaticFiles(new StaticFileOptions
			{
				OnPrepareResponse = ctx =>
				{
					ctx.Context.Response.Headers.Add(
						 "Cache-Control", "no-cache");
				}
			}); //"TypeScriptJQFolder": "..\\..\\..\\..\\Scripts\\ClientApi" because of wwwwroot in play
#endif
		}
	}
}
