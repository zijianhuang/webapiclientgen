using System;
using System.Text;
using System.Collections.Generic;
using System.Linq;
using System.Diagnostics;
using Xunit;

namespace Fonlow.Testing
{
    /// <summary>
    /// Launch IIS Express if AppSettings["Testing_UseIisExpress"] is true, using the following settings
    /// AppSettings["Testing_HostSite"]; AppSettings["Testing_HostSiteApplicationPool"];
    /// </summary>
    public class IisExpressFixture : IDisposable
    {
        public IisExpressFixture()
        {
            Debug.WriteLine("To create IisExpressFixture");
            var useIisExpress = System.Configuration.ConfigurationManager.AppSettings["Testing_UseIisExpress"];
            if (String.Equals(useIisExpress, "true", StringComparison.CurrentCultureIgnoreCase))
            {
                var hostSite = System.Configuration.ConfigurationManager.AppSettings["Testing_HostSite"];
                var hostSiteApplicationPool = System.Configuration.ConfigurationManager.AppSettings["Testing_HostSiteApplicationPool"];
                iisExpressAgent = new IisExpressAgent();
                var iisStartArguments = String.Format("/site:\"{0}\" /apppool:\"{1}\"", hostSite, hostSiteApplicationPool);
                iisExpressAgent.Start(iisStartArguments);
                BaseUri = new Uri(System.Configuration.ConfigurationManager.AppSettings["Testing_BaseUrl"]);
            }
        }

        /// <summary>
        /// Create the fixture only if AppSettings["Testing_UseIisExpress"].
        /// </summary>
        /// <returns>Null if AppSettings["Testing_UseIisExpress"] is false.</returns>
        public static IisExpressFixture Create()
        {
            var useIisExpress = System.Configuration.ConfigurationManager.AppSettings["Testing_UseIisExpress"];
            if (String.Equals(useIisExpress, "true", StringComparison.CurrentCultureIgnoreCase))
                return new IisExpressFixture();

            return null;
        }

        public Uri BaseUri
        { get; private set; }

        IisExpressAgent iisExpressAgent;


        bool disposed;

        // implements IDisposable
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!disposed)
            {
                // if this is a dispose call dispose on all state you
                // hold, and take yourself off the Finalization queue.
                if (disposing)
                {
                    if (iisExpressAgent != null)
                    {
                        iisExpressAgent.Stop();
                        Trace.TraceInformation("IIS Express stoped.");
                    }
                }

                disposed = true;
            }
        }

    }

}