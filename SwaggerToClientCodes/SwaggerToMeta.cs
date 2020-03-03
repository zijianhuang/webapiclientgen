using System;
using Microsoft.OpenApi.Models;
using Microsoft.OpenApi.Readers;
using Microsoft.OpenApi.Readers.Exceptions;
using Microsoft.OpenApi;
using System.IO;
using System.Text;
using Fonlow.Web.Meta;
using System.Linq;
using System.Text.RegularExpressions;
using System.Collections.Generic;
using Tavis.UriTemplates;
using System.CodeDom;
using System.Diagnostics;
using Fonlow.Reflection;
using Fonlow.OpenApi.ClientTypes;

namespace Fonlow.WebApiClientGen.Swag
{
	public class SwaggerToMeta
	{
		public SwaggerToMeta(OpenApiDocument swagDoc, Settings settings)
		{
			this.swagDoc = swagDoc;
			this.settings = settings;

			nameComposer = new NameComposer(settings);
		}

		OpenApiDocument swagDoc;
		Settings settings;
		NameComposer nameComposer;

		public WebApiDescription[] GetDescriptions()
		{
			List<WebApiDescription> ds = new List<WebApiDescription>();
			foreach (var p in swagDoc.Paths) // each path contain multiple operations
			{
				var urlPath = p.Key;
				var pathItem = p.Value;
				foreach (var opKV in pathItem.Operations)
				{
					var id = Guid.NewGuid().ToString();
					var d = new WebApiDescription(id)
					{
						ActionDescriptor = new ActionDescriptor()
						{
							ActionName = nameComposer.GetActionName(opKV.Value, opKV.Key.ToString()),
							//ReturnType=
						}
					};

					var controllerName = nameComposer.GetControllerName(opKV.Value, urlPath);
					var actionDescriptor = new ActionDescriptor();
					d.ActionDescriptor = actionDescriptor;
					actionDescriptor.ControllerDescriptor = new ControllerDescriptor()
					{
						ControllerName = controllerName
					};
					if (opKV.Key > OperationType.Delete)
					{
						throw new InvalidDataException("Support only GET, PUT, POST and DELETE, not " + opKV.Key);
					}

					d.HttpMethod = opKV.Key.ToString();
					d.RelativePath = urlPath;

				}
			}
			return swagDoc.Paths.Select(p =>
			{
				var d = new WebApiDescription(p.Key);
				d.ActionDescriptor.ControllerDescriptor = new ControllerDescriptor()
				{
					ControllerName = nameComposer.PathToControllerName(p.Key)
				};

				d.RelativePath = p.Key;
				d.Documentation = p.Value.Description;
				//var op = p.Value.Operations[OperationType.]

				return d;
			}).ToArray();
		}

		static OpenApiReference GetReturnType(OpenApiOperation op)
		{
			var goodResponse = op.Responses["200"];
			if (goodResponse != null)
			{
				return goodResponse.Content["application/json"].Schema.Reference;
			}

			return null;
		}

		CodeMemberMethod CreateApiFunction(OpenApiOperation op)
		{

		}

	}
}
