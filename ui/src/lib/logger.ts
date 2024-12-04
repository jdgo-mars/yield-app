// src/utils/logger.ts
import * as Sentry from "@sentry/react";
import { SeverityLevel } from "@sentry/types";

interface LogEntry {
  level: SeverityLevel;
  message: string;
  data?: unknown;
  timestamp: string;
}

const LOG_LEVEL = import.meta.env.VITE_LOG_LEVEL || "info";

class Logger {
  private static shouldLog(level: SeverityLevel): boolean {
    const levels: SeverityLevel[] = ["info", "warning", "error", "fatal"];
    return levels.indexOf(level) >= levels.indexOf(LOG_LEVEL as SeverityLevel);
  }

  /**
   * Logs a message to the console and Sentry if the log level is error and we are in production mode.
   *
   * @param {SeverityLevel} level - The level of the log message. Can be "info", "warning", "error", or "fatal".
   * @param {string} message - The log message.
   * @param {unknown} [data] - Optional data to log.
   */
  private static log(
    level: SeverityLevel,
    message: string,
    data: unknown = null
  ): void {
    if (!Logger.shouldLog(level)) return;

    const logEntry: LogEntry = {
      level,
      message,
      data,
      timestamp: new Date().toISOString(),
    };

    switch (level) {
      case "warning":
        console.warn(logEntry);
        break;
      case "fatal":
      case "error":
        console.error(logEntry);
        break;
      case "info":
        console.info(logEntry);
        break;
      default:
        console.log(logEntry);
    }

    // If we are in production mode, send the log to Sentry
    if (import.meta.env.MODE === "production") {
      Logger.sendToSentry(logEntry);
    }
  }

  public static warn(message: string, data?: unknown): void {
    Logger.log("warning", message, data);
  }

  public static debug(message: string, data?: unknown): void {
    Logger.log("log", message, data);
  }

  public static info(message: string, data?: unknown): void {
    Logger.log("info", message, data);
  }

  public static fatal(message: string, data?: unknown): void {
    Logger.log("fatal", message, data);
  }

  public static error(message: string, data?: unknown): void {
    Logger.log("error", message, data);
  }

  private static sendToSentry(logEntry: LogEntry): void {
    // Send the error to Sentry
    Sentry.captureMessage(logEntry.message, {
      level: logEntry.level,
    });

    if (logEntry.data instanceof Error) {
      Sentry.captureException(logEntry.data);
    }
  }
}

export default Logger;
