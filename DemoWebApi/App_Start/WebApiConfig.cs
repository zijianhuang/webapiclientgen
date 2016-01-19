using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web.Http;
using Microsoft.Owin.Security.OAuth;
using Newtonsoft.Json.Serialization;
using DemoWebApi.Models;

namespace DemoWebApi
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services
            // Configure Web API to use only bearer token authentication.
            config.SuppressDefaultHostAuthentication();
            config.Filters.Add(new HostAuthenticationFilter(OAuthDefaults.AuthenticationType));

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            //http://forums.asp.net/t/1821729.aspx?JsonMediaTypeFormatter+does+not+work+with+Tuple+int+List+string+
            config.Formatters.JsonFormatter.SerializerSettings.ContractResolver = new DefaultContractResolver();
            //this will support Tuple serialization in JSON

            config.Filters.Add(new ValidateModelAttribute());

            config.Services.RemoveAll(typeof(System.Web.Http.Validation.ModelValidatorProvider), (provider) => provider is System.Web.Http.Validation.Providers.InvalidModelValidatorProvider);
            //  GlobalConfiguration.Configuration.Services.Add(typeof(System.Web.Http.Validation.ModelValidatorProvider), new System.Web.Http.Validation.Providers.RequiredMemberModelValidatorProvider());

            var formatters = GlobalConfiguration.Configuration.Formatters;
            var jsonFormatter = formatters.JsonFormatter;
            var settings = jsonFormatter.SerializerSettings;
            settings.Formatting = Newtonsoft.Json.Formatting.Indented;
            settings.ContractResolver = new CamelCasePropertyNamesContractResolver();
        }
    }
}
