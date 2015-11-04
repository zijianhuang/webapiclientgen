using System.Web.Mvc;

namespace DemoWebApi.Models
{
    /// <summary>
    /// HandleErrorAttribute registered in FilterConfig will display error details if the request is made locally. This attribute will
    /// additionally trace the exception before passing the exception to the default handler.
    /// </summary>
    public class TraceErrorAttribute : HandleErrorAttribute
    {
        public override void OnException(ExceptionContext filterContext)
        {
            System.Diagnostics.Trace.TraceError("Controller: {0}; View: {1}; Exception: {2}",
                filterContext.Controller.ToString(), View, filterContext.Exception.ToString());
            base.OnException(filterContext);
        }
    }

}
