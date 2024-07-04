using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.Collections.Generic;
using System;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using System.Threading.Tasks;
using DemoWebApi.Models;
using Fonlow.Auth.Models;
namespace WebApp.Utilities
{
	public class OAuth2RequestBinderProvider : Microsoft.AspNetCore.Mvc.ModelBinding.IModelBinderProvider
	{
		public IModelBinder GetBinder(ModelBinderProviderContext context)
		{
			if (context.Metadata.ModelType != typeof(RequestBase))
			{
				return null;
			}

			var subclasses = new[] { typeof(ROPCRequst), typeof(RefreshAccessTokenRequest), };

			var binders = new Dictionary<Type, (ModelMetadata, IModelBinder)>();
			foreach (var type in subclasses)
			{
				var modelMetadata = context.MetadataProvider.GetMetadataForType(type);
				binders[type] = (modelMetadata, context.CreateBinder(modelMetadata));
			}

			return new RequestModelBinder(binders);
		}
	}

	public class RequestModelBinder : IModelBinder
	{
		private Dictionary<Type, (ModelMetadata, IModelBinder)> binders;

		public RequestModelBinder(Dictionary<Type, (ModelMetadata, IModelBinder)> binders)
		{
			this.binders = binders;
		}

		public async Task BindModelAsync(ModelBindingContext bindingContext)
		{
			if (bindingContext.HttpContext.Request.ContentType.Contains("application/json"))
			{
				return;
			}
			//using var sr = new StreamReader(bindingContext.HttpContext.Request.Body);
			//var json = await sr.ReadToEndAsync(); //only work for Json payload

			var modelKindName = ModelNames.CreatePropertyModelName(bindingContext.ModelName, "grant_type"); //todo: extract JsonPropertyName value or NewtonsoSoft JsonPropery value
			var modelTypeValue = bindingContext.ValueProvider.GetValue(modelKindName).FirstValue;

			IModelBinder modelBinder;
			ModelMetadata modelMetadata;
			if (modelTypeValue == "password")
			{
				(modelMetadata, modelBinder) = binders[typeof(ROPCRequst)];
			}
			else if (modelTypeValue == "refresh_token")
			{
				(modelMetadata, modelBinder) = binders[typeof(RefreshAccessTokenRequest)];
			}
			else
			{
				bindingContext.Result = ModelBindingResult.Failed();
				return;
			}

			var newBindingContext = DefaultModelBindingContext.CreateBindingContext(
				bindingContext.ActionContext,
				bindingContext.ValueProvider,
				modelMetadata,
				bindingInfo: null,
				bindingContext.ModelName);

			await modelBinder.BindModelAsync(newBindingContext);
			bindingContext.Result = newBindingContext.Result;

			if (newBindingContext.Result.IsModelSet)
			{
				(newBindingContext.Result.Model as RequestBase).GrantType = modelTypeValue;
				// Setting the ValidationState ensures properties on derived types are correctly 
				bindingContext.ValidationState[newBindingContext.Result.Model] = new ValidationStateEntry
				{
					Metadata = modelMetadata,
				};
			}
		}
	}
}