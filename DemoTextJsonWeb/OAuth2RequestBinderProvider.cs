using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.Collections.Generic;
using System;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using System.Threading.Tasks;
using DemoWebApi.Models;
using Fonlow.Auth.Models;
using Microsoft.AspNetCore.Mvc.ModelBinding.Metadata;
using System.Text.Json.Serialization;
using System.ComponentModel;
using System.Reflection;
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

			//return new RequestModelBinder(binders);
			return new JsonPropertyQueryModelBinder(binders);
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
				foreach (var p in modelMetadata.Properties)
				{
					var propertyName = p.Name;
					//var pType = p.GetType().FullName;
					var pp = p as DefaultModelMetadata;
					var jsonPropertyNameAttr = pp.Attributes.PropertyAttributes.OfType<JsonPropertyNameAttribute>().FirstOrDefault();

					var mkn = ModelNames.CreatePropertyModelName(bindingContext.ModelName, jsonPropertyNameAttr == null ? propertyName : jsonPropertyNameAttr.Name);
					var pv = bindingContext.ValueProvider.GetValue(mkn).FirstValue;
				}

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

	//https://github.com/dotnet/aspnetcore/issues/27489
	public class JsonPropertyQueryModelBinder : IModelBinder
	{
		private Dictionary<Type, (ModelMetadata, IModelBinder)> binders;

		public JsonPropertyQueryModelBinder(Dictionary<Type, (ModelMetadata, IModelBinder)> binders)
		{
			this.binders = binders;
		}

		public async Task BindModelAsync(ModelBindingContext bindingContext)
		{
			ArgumentNullException.ThrowIfNull(bindingContext);

			if (bindingContext.HttpContext.Request.ContentType.Contains("application/json"))
			{
				return;
			}

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

			Dictionary<PropertyInfo, string> modelProps = new Dictionary<PropertyInfo, string>();
			foreach (var prop in bindingContext.ModelType.GetProperties())
			{
				var jp = prop.GetCustomAttributes<JsonPropertyNameAttribute>().FirstOrDefault();
				if (jp != null)
					modelProps.Add(prop, jp.Name);
				else
					modelProps.Add(prop, prop.Name);
			}

			var model = Activator.CreateInstance(bindingContext.ModelType);
			foreach (var prop in modelProps)
			{
				var val = bindingContext.ValueProvider.GetValue(prop.Value);
				if (val != null && val.Length > 0)
				{
					TypeConverter converter;
					if (prop.Key.PropertyType.IsArray)
					{
						var propElementType = prop.Key.PropertyType.GetElementType();
						converter = TypeDescriptor.GetConverter(propElementType);
						var values = Array.CreateInstance(propElementType, val.Length);
						bool success = true;
						for (int i = 0; i < val.Length; i++)
						{
							try
							{
								values.SetValue(converter.ConvertFrom(val.Values.ElementAt(i)), i);
							}
							catch
							{
								success = false;
								break;
							}
						}
						if (success)
						{
							prop.Key.SetValue(model, values);
							continue;
						}
					}
					else
					{
						converter = TypeDescriptor.GetConverter(prop.Key.PropertyType);
						try
						{
							prop.Key.SetValue(model, converter.ConvertFrom(val.Values.Last()));
							continue;
						}
						catch
						{ }
					}

					bindingContext.ModelState.TryAddModelError(prop.Value, $"The value \"{prop.Value}\" is not valid.");
				}
			}

			//bindingContext.Result = ModelBindingResult.Success(model);
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