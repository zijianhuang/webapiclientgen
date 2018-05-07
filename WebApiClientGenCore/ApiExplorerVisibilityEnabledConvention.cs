using Microsoft.AspNetCore.Mvc.ApplicationModels;

namespace Fonlow.CodeDom.Web
{
	/// <summary>
	/// To be added to MVC option convensions in startup.cs to make api explorers of controllers become visible.
	/// </summary>
	public class ApiExplorerVisibilityEnabledConvention : IApplicationModelConvention
	{
		/// <summary>
		/// Make the ApiExplorer of each controller become visible, so the code gen could see them inside the controller. 
		/// </summary>
		/// <param name="application"></param>
		public void Apply(ApplicationModel application)
		{
			foreach (var controller in application.Controllers)
			{
				if (controller.ApiExplorer.IsVisible == null)
				{
					controller.ApiExplorer.IsVisible = true;
					controller.ApiExplorer.GroupName = controller.ControllerName;
				}
			}
		}
	}

}
