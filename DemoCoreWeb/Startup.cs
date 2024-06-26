﻿//using Fonlow.DateOnlyExtensions;
//using Fonlow.IntegralExtensions;
//namespace DemoCoreWeb
//{
//	public class Startup
//	{
//		public Startup(IConfiguration configuration)
//		{
//			Configuration = configuration;
//		}

//		public IConfiguration Configuration { get; }

//		public void ConfigureServices(IServiceCollection services)
//		{
//			services.AddControllers(
//				options =>
//				{
//					options.Filters.Add(new ValidateModelAttribute()); // wholesale style to check model binding for all API calls.
//					//options.OutputFormatters by default includes: HttpNoContent, String, Stream, SystemTextJson
//#if DEBUG
//					options.Conventions.Add(new Fonlow.CodeDom.Web.ApiExplorerVisibilityEnabledConvention());//To make ApiExplorer be visible to WebApiClientGen

//#endif
//				}
//			)
//			.AddNewtonsoftJson(
//				options =>
//				{
//					options.SerializerSettings.DateParseHandling = Newtonsoft.Json.DateParseHandling.DateTimeOffset; //Better with this for cross-timezone minValue and .NET Framework clients.
//					options.SerializerSettings.NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore; //So when controller will ignore null fileds when returing data

//					options.SerializerSettings.Converters.Add(new DateOnlyJsonConverter()); //not needed for ASP.NET 7 and .NET 7 clients. However .NET 6 clients and .NET Framework clients still need DateOnlyJsonConverter
//					options.SerializerSettings.Converters.Add(new DateOnlyNullableJsonConverter()); // also, needed by JavaScript clients.

//					// JS clients need these integral JsonConverters for large integral numbers
//					options.SerializerSettings.Converters.Add(new Int64JsonConverter());
//					options.SerializerSettings.Converters.Add(new Int64NullableJsonConverter());
//					options.SerializerSettings.Converters.Add(new UInt64JsonConverter());
//					options.SerializerSettings.Converters.Add(new UInt64NullableJsonConverter());
//					options.SerializerSettings.Converters.Add(new BigIntegerJsonConverter());
//					options.SerializerSettings.Converters.Add(new BigIntegerNullableJsonConverter());
//				}
//			)
//			.ConfigureApiBehaviorOptions(options=>{
//				//options.SuppressModelStateInvalidFilter = true; //No effect on the API designs here which rarely return BadRequestObjectResult directly.
//			});

//			services.AddRouting();
//			services.AddCors();
//		}

//		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
//		public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
//		{
//			if (env.IsDevelopment())
//			{
//				app.UseDeveloperExceptionPage();
//			}

//			app.UseRouting();
//			app.UseCors(builder => builder.AllowAnyOrigin()
//				.AllowAnyHeader().AllowAnyMethod()
//				);
//			app.UseEndpoints(endpoints =>
//			{
//				endpoints.MapControllers();
//			});

//#if DEBUG  // This is for running the QUnit cases with tests.html. The CodeGenSetting should be "TypeScriptJQFolder": "..\\..\\..\\Scripts\\ClientApi" without StaticFiles
//			app.UseStaticFiles(new StaticFileOptions
//			{
//				OnPrepareResponse = ctx =>
//				{
//					ctx.Context.Response.Headers.Add(
//						 "Cache-Control", "no-cache");
//				}
//			}); //"TypeScriptJQFolder": "..\\..\\..\\..\\Scripts\\ClientApi" because of wwwwroot in play
//#endif
//		}
//	}
//}
