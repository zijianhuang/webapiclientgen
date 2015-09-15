using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Diagnostics;

namespace Fonlow.Testing
{
    /// <summary>
    /// For starting and stoping IIS Express
    /// </summary>
    /// <remarks>The IIS Express config is at </remarks>
    public class IisExpressAgent
    {
        public void Start(string arguments)
        {
            ProcessStartInfo info = new ProcessStartInfo(@"C:\Program Files (x86)\IIS Express\iisexpress.exe", arguments)
            {
                // WindowStyle= ProcessWindowStyle.Minimized
            };

            process = Process.Start(info);
            Debug.WriteLine("IIS Express started: " + arguments);
            timeStart = DateTime.Now;
        }

        DateTime timeStart;

        Process process;

        public void Stop()
        {
            if (process == null)
                return;

            try
            {
                var span = (DateTime.Now - timeStart).TotalSeconds;
                Debug.WriteLine(String.Format("Test cases with IIS Express had run for {0} seconds.", span));
                process.Kill();
            }
            catch (System.ComponentModel.Win32Exception e)
            {
                Trace.TraceWarning(e.Message);
            }
            catch (InvalidOperationException e)
            {
                Trace.TraceWarning(e.Message);
            }
        }
    }
}
