﻿using DemoWebApi.DemoData.Client;
using System;
using System.Collections.Generic;
using Xunit;
using Fonlow.DateOnlyExtensions;
using Fonlow.Testing;

namespace IntegrationTests
{
	public class DateTypesFixture : DefaultHttpClient
	{
		public DateTypesFixture()
		{
			httpClient = new System.Net.Http.HttpClient
			{
				BaseAddress = base.BaseUri
			};

			var jsonSerializerSettings = new Newtonsoft.Json.JsonSerializerSettings()
			{
				NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore,
			};

			jsonSerializerSettings.Converters.Add(new DateOnlyJsonConverter());
			jsonSerializerSettings.Converters.Add(new DateOnlyNullableJsonConverter());
			jsonSerializerSettings.Converters.Add(new DateTimeOffsetJsonConverter());
			jsonSerializerSettings.Converters.Add(new DateTimeOffsetNullableJsonConverter());
			jsonSerializerSettings.Converters.Add(new DateTimeJsonConverter());
			jsonSerializerSettings.Converters.Add(new DateTimeNullableJsonConverter());

			Api = new DemoWebApi.Controllers.Client.DateTypes(httpClient, jsonSerializerSettings);
		}

		public DemoWebApi.Controllers.Client.DateTypes Api { get; private set; }

		readonly System.Net.Http.HttpClient httpClient;

		#region IDisposable pattern
		bool disposed;

		public void Dispose()
		{
			Dispose(true);
			GC.SuppressFinalize(this);
		}

		protected virtual void Dispose(bool disposing)
		{
			if (!disposed)
			{
				if (disposing)
				{
					httpClient.Dispose();
				}

				disposed = true;
			}
		}
		#endregion
	}
}