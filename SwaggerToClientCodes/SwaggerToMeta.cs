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
			foreach (var p in swagDoc.Paths)
			{
				var urlPath = p.Key;
				var pathItem = p.Value;
				foreach (var opKV in pathItem.Operations)
				{
					var id = Guid.NewGuid().ToString();
					var d = new WebApiDescription(id);

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
					actionDescriptor.ActionName = nameComposer.GetActionName(opKV.Value, opKV.Key.ToString());

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

	}
}
