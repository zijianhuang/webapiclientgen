
using Fonlow.IntegralExtensions;
using WebApp.Utilities;

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
	configure.ModelBinderProviders.Insert(0, new OAuth2RequestBinderProvider());
})
.AddJsonOptions(// as of .NET 7/8, could not handle JS/CS test cases getInt2D, postInt2D and PostDictionaryOfPeople, around 14 C# test cases fail.
options =>
{
	options.JsonSerializerOptions.Converters.Add(new BigIntegerJsonConverter());
	options.JsonSerializerOptions.Converters.Add(new Int64JsonConverter());
	options.JsonSerializerOptions.Converters.Add(new UInt64JsonConverter());
	options.JsonSerializerOptions.Converters.Add(new Int128JsonConverter());
	options.JsonSerializerOptions.Converters.Add(new UInt128JsonConverter());

	options.JsonSerializerOptions.NumberHandling = System.Text.Json.Serialization.JsonNumberHandling.AllowReadingFromString; // for the sake of UInt128

	//Needed by .NET Framework clients, JavaScript clients and any naughty client, since System.Text.Json is a bit less fault tolerant than Newtonsoft.Json
	options.JsonSerializerOptions.Converters.Add(new Fonlow.Text.Json.DateOnlyExtensions.DateOnlyJsonConverter());
	options.JsonSerializerOptions.Converters.Add(new Fonlow.Text.Json.DateOnlyExtensions.DateTimeJsonConverter());
	options.JsonSerializerOptions.Converters.Add(new Fonlow.Text.Json.DateOnlyExtensions.DateTimeOffsetJsonConverter());
	//options.JsonSerializerOptions.Converters.Add(new Fonlow.Text.Json.Auth.TokenRequestConverter());
	options.JsonSerializerOptions.Converters.Add(new Fonlow.Text.Json.Auth.TokenResponseConverter());

});

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

app.Run();
Console.WriteLine("Run Done.");
