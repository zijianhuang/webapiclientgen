using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json.Serialization;

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
			services.AddMvc(
				options =>
				{
#if DEBUG
					options.Conventions.Add(new Fonlow.CodeDom.Web.ApiExplorerVisibilityEnabledConvention());//To make ApiExplorer be visible to WebApiClientGen
#endif
				}
			).AddNewtonsoftJson();

			services.AddRouting();
			services.AddCors();
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IHostEnvironment env)
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
			app.UseStaticFiles(); //"TypeScriptJQFolder": "..\\..\\..\\..\\Scripts\\ClientApi" because of wwwwroot in play
#endif
		}
	}
}
