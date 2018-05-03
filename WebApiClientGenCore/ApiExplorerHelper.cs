using Fonlow.Reflection;
using System;
using System.Diagnostics;
using System.Linq;
using System.Reflection;
using Microsoft.AspNetCore.Mvc.ApiExplorer;
using Microsoft.AspNetCore.Mvc;


namespace Fonlow.CodeDom.Web
{
    public static class ApiExplorerHelper
    {
		public static ControllerBase[] GetApiControllers(Assembly assembly)
		{
			try
			{
				return assembly.GetTypes().OfType<ControllerBase>().ToArray();
			}
			catch (ReflectionTypeLoadException e)
			{
				foreach (Exception ex in e.LoaderExceptions)
				{
					Trace.TraceWarning(String.Format("When loading {0}, GetTypes errors occur: {1}", assembly.FullName, ex.Message));
				}
			}
			catch (TargetInvocationException e)
			{
				Trace.TraceWarning(String.Format("When loading {0}, GetTypes errors occur: {1}", assembly.FullName, e.Message + "~~" + e.InnerException.Message));
			}

			return null;
		}

		public static Microsoft.AspNetCore.Mvc.Controllers.ControllerActionDescriptor[] GetDescriptors(Assembly assembly)
		{
			var controllers = GetApiControllers(assembly);
			return controllers.Select(c => c.ControllerContext.ActionDescriptor).ToArray();
		}
	}


}
