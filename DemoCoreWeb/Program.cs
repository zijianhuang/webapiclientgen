using Fonlow.DateOnlyExtensions;
using Fonlow.IntegralExtensions;

System.Reflection.Assembly appAssembly = System.Reflection.Assembly.GetExecutingAssembly();
string dirOfAppAssembly = System.IO.Path.GetDirectoryName(appAssembly.Location);
IConfigurationRoot config = new ConfigurationBuilder().AddJsonFile(System.IO.Path.Combine(dirOfAppAssembly, "appsettings.json")).Build();
IConfigurationSection appSettings = config.GetSection("appSettings");
string environment = appSettings.GetValue<string>("environment");

string webRootPath = "./";

// WebRootPath is to tell the Web server where to look for files to serve.
// ContentRootPath is to tell the Web service code where to look for data.
// On Windows, ContentRootPath is the starting folder of the app assembly, and on MacOS, it is the user profile folder like //Users/MyName.
// Thus on MacOS, the App_Data folder should be under the user profile folder.
WebApplicationOptions options = new WebApplicationOptions
{
	WebRootPath = webRootPath,
	Args = args,
};


WebApplicationBuilder builder = WebApplication.CreateBuilder(options);
builder.Configuration.AddConfiguration(config);
Console.WriteLine($"Start at contentRootPath: {builder.Environment.ContentRootPath}; WebRootPath: {builder.Environment.WebRootPath}");

builder.Services.AddControllers(configure =>
{
#if DEBUG
	configure.Conventions.Add(new Fonlow.CodeDom.Web.ApiExplorerVisibilityEnabledConvention());//To make ApiExplorer be visible to WebApiClientGen
#endif
	configure.Filters.Add(new DemoCoreWeb.ValidateModelAttribute());
})
.AddNewtonsoftJson(
	options =>
	{
		options.SerializerSettings.DateParseHandling = Newtonsoft.Json.DateParseHandling.DateTimeOffset; //Better with this for cross-timezone minValue and .NET Framework clients.
		options.SerializerSettings.NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore; //So when controller will ignore null fileds when returing data

		//not needed for ASP.NET 7 and .NET 7 clients.
		// However .NET 6 clients and .NET Framework clients still need DateOnlyJsonConverter. Also, needed by JavaScript clients.
		options.SerializerSettings.Converters.Add(new DateOnlyJsonConverter()); 
		options.SerializerSettings.Converters.Add(new DateOnlyNullableJsonConverter()); // 

		// JS clients need these integral JsonConverters for large integral numbers
		options.SerializerSettings.Converters.Add(new Int64JsonConverter());
		options.SerializerSettings.Converters.Add(new Int64NullableJsonConverter());
		options.SerializerSettings.Converters.Add(new UInt64JsonConverter());
		options.SerializerSettings.Converters.Add(new UInt64NullableJsonConverter());
		options.SerializerSettings.Converters.Add(new BigIntegerJsonConverter());
		options.SerializerSettings.Converters.Add(new BigIntegerNullableJsonConverter());
	}
);

builder.Services.AddCors(options => options.AddPolicy("All", builder =>
{
	builder.AllowAnyMethod()
		   .AllowAnyOrigin()
		   .AllowAnyHeader()
		   ;
}));

WebApplication app = builder.Build();
app.UseMiddleware(typeof(WebApp.Utilities.ErrorHandlingMiddleware));

if (app.Environment.IsDevelopment()) //ASPNETCORE_ENVIRONMENT=Development in web.config
{
	app.UseDeveloperExceptionPage();
}
else
{
	//	//Only release build support https redirection.
	//#if RELEASE
	//	if (useHttps) // for locally running app, no need to have https.
	//	{
	//		app.UseHttpsRedirection();
	//		app.UseHsts();//https://learn.microsoft.com/en-us/aspnet/core/security/enforcing-ssl?view=aspnetcore-6.0
	//	}
	//#endif
}
app.UseRouting();
app.UseCors(builder => builder.AllowAnyOrigin()
	.AllowAnyHeader().AllowAnyMethod()
	);
app.MapControllers();

if (args.Length > 1)
{
	app.Urls.Add(builder.Environment.WebRootPath);
}

#if DEBUG  // This is for running the QUnit cases with tests.html. The CodeGenSetting should be "TypeScriptJQFolder": "..\\..\\..\\Scripts\\ClientApi" without StaticFiles
app.UseStaticFiles(new StaticFileOptions
{
	OnPrepareResponse = ctx =>
	{
#pragma warning disable ASP0019 // Suggest using IHeaderDictionary.Append or the indexer
		ctx.Context.Response.Headers.Add(
			 "Cache-Control", "no-cache");
#pragma warning restore ASP0019 // Suggest using IHeaderDictionary.Append or the indexer
	}
}); //"TypeScriptJQFolder": "..\\..\\..\\..\\Scripts\\ClientApi" because of wwwwroot in play
#endif

app.Run();
Console.WriteLine("Run Done.");
