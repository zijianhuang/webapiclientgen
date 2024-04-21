string webRootPath = "./";


// WebRootPath is to tell the Web server where to look for files to serve.
// ContentRootPath is to tell the Web service code where to look for data.
// On Windows, ContentRootPath is the starting folder of the app assembly, and on MacOS, it is the user profile folder like //Users/MyName.
// Thus on MacOS, the App_Data folder should be under the user profile folder.
var options = new WebApplicationOptions
{
	WebRootPath = webRootPath,
	Args = args,
};

var builder = WebApplication.CreateBuilder(options);

// Add services to the container.

builder.Services.AddControllers();

var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseAuthorization();

app.MapControllers();

app.Run();
