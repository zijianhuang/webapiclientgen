using System;
using System.Collections.Generic;
using System.Text;
using System.Diagnostics;
using Microsoft.Extensions.Logging;

namespace Fonlow.Diagnostics
{
    public class LoggerTraceListener : TraceListener
    {
        private readonly ILogger logger;

        public LoggerTraceListener(ILogger logger)
        {
            this.logger = logger;
        }

        public override void Write(string message)
        {
            logger.LogInformation(message);
        }

        public override void WriteLine(string message)
        {
            logger.LogInformation(message);
        }

        public override void WriteLine(string message, string category)
        {
            logger.LogInformation(category + ": " + message);
        }

        public override void TraceEvent(TraceEventCache eventCache, string source, TraceEventType eventType, int id)
        {
            switch (eventType)
            {
                case TraceEventType.Critical:
                    logger.LogCritical(id, source);
                    break;
                case TraceEventType.Error:
                    logger.LogError(id, source);
                    break;
                case TraceEventType.Warning:
                    logger.LogWarning(id, source);
                    break;
                case TraceEventType.Information:
                    logger.LogInformation(id, source);
                    break;
                case TraceEventType.Verbose:
                    logger.LogTrace(id, source);
                    break;
                case TraceEventType.Start:
                    logger.LogInformation(id, "Start: " + source);
                    break;
                case TraceEventType.Stop:
                    logger.LogInformation(id, "Stop: " + source);
                    break;
                case TraceEventType.Suspend:
                    logger.LogInformation(id, "Suspend: " + source);
                    break;
                case TraceEventType.Resume:
                    logger.LogInformation(id, "Resume: " + source);
                    break;
                case TraceEventType.Transfer:
                    logger.LogInformation(id, "Transfer: " + source);
                    break;
                default:
                    throw new InvalidOperationException("Impossible");
            }
        }

        public override void TraceEvent(TraceEventCache eventCache, string source, TraceEventType eventType, int id, string format, params object[] args)
        {

            var message = args == null ? format : String.Format(format, args);

            switch (eventType)
            {
                case TraceEventType.Critical:
                    logger.LogCritical(id, message);
                    break;
                case TraceEventType.Error:
                    logger.LogError(id, message);
                    break;
                case TraceEventType.Warning:
                    logger.LogWarning(id, message);
                    break;
                case TraceEventType.Information:
                    logger.LogInformation(id, message);
                    break;
                case TraceEventType.Verbose:
                    logger.LogTrace(id, message);
                    break;
                case TraceEventType.Start:
                    logger.LogInformation(id, "Start: " + message);
                    break;
                case TraceEventType.Stop:
                    logger.LogInformation(id, "Stop: " + message);
                    break;
                case TraceEventType.Suspend:
                    logger.LogInformation(id, "Suspend: " + message);
                    break;
                case TraceEventType.Resume:
                    logger.LogInformation(id, "Resume: " + message);
                    break;
                case TraceEventType.Transfer:
                    logger.LogInformation(id, "Transfer: " + message);
                    break;
                default:
                    throw new InvalidOperationException("Impossible");
            }
        }

        public override void TraceEvent(TraceEventCache eventCache, string source, TraceEventType eventType, int id, string message)
        {
            switch (eventType)
            {
                case TraceEventType.Critical:
                    logger.LogCritical(id, message);
                    break;
                case TraceEventType.Error:
                    logger.LogError(id, message);
                    break;
                case TraceEventType.Warning:
                    logger.LogWarning(id, message);
                    break;
                case TraceEventType.Information:
                    logger.LogInformation(id, message);
                    break;
                case TraceEventType.Verbose:
                    logger.LogTrace(id, message);
                    break;
                case TraceEventType.Start:
                    logger.LogInformation(id, "Start: " + message);
                    break;
                case TraceEventType.Stop:
                    logger.LogInformation(id, "Stop: " + message);
                    break;
                case TraceEventType.Suspend:
                    logger.LogInformation(id, "Suspend: " + message);
                    break;
                case TraceEventType.Resume:
                    logger.LogInformation(id, "Resume: " + message);
                    break;
                case TraceEventType.Transfer:
                    logger.LogInformation(id, "Transfer: " + message);
                    break;
                default:
                    throw new InvalidOperationException("Impossible");
            }
        }

    }
}
