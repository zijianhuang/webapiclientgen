using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web.Http;
using Microsoft.Owin.Security.OAuth;
using Newtonsoft.Json.Serialization;
using DemoWebApi.Models;
using System.Web.Http.Hosting;
using System.Web.Http.WebHost;
using System.Web;

namespace DemoWebApi
{
    public class NoBufferPolicySelector : WebHostBufferPolicySelector
    {
        public override bool UseBufferedInputStream(object hostContext)
        {
            //var context = hostContext as HttpContextBase;

            //if (context != null)
            //{
            //    if (string.Equals(context.Request.RequestContext.RouteData.Values["controller"].ToString(), "FileUpload", StringComparison.InvariantCultureIgnoreCase))
            //        return false;
            //}

            //return true;
            return false;
        }

        public override bool UseBufferedOutputStream(HttpResponseMessage response)
        {
            return base.UseBufferedOutputStream(response);
        }
    }
}