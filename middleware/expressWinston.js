import expressWinston from "express-winston";
import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file"; // Import the DailyRotateFile transport

const logerMas = (req) => {
  return {
    correlationId: req.headers["x-correlation-id"],
    reqbody: req.body,
  };
};
const filetranspote =  new DailyRotateFile({
    filename: "log-info-%DATE%.log",
    datePattern: "yyyy-MM-DD-HH",
    zippedArchive: true, // Optional: Enable file compression
    maxSize: "20m", // Optional: Maximum log file size
    maxFiles: "14d", // Optional: Retention period (14 days)
    dirname: "logs", // Optional: Specify the directory for log files
  });
const fileErrortranspote =  new DailyRotateFile({
    filename: "log-ErrorInfo-%DATE%.log",
    datePattern: "yyyy-MM-DD-HH",
    zippedArchive: true, // Optional: Enable file compression
    maxSize: "20m", // Optional: Maximum log file size
    maxFiles: "14d", // Optional: Retention period (14 days)
    dirname: "Errorlogs", // Optional: Specify the directory for log files
  });
// Create a Winston logger instance
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    // Add the DailyRotateFile transport for log files
    filetranspote,
  ],
});

export const expressWinstonLogger = expressWinston.logger({
  transports: [
    new winston.transports.Console(),
    // Add the DailyRotateFile transport for log files
    filetranspote
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  ),
  meta:true,
  msg: "HTTP {{req.method}} {{req.url}}",
  winstonInstance: logger,
});

const errorLogFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.json()
);
// Create a Winston logger instance for errors
const errorLogger = winston.createLogger({
    level: "error", // Set the log level to capture only errors
    format: errorLogFormat,
    transports: [
      new winston.transports.Console(), // You can add other transports as needed
      fileErrortranspote
    ],
    dynamicMeta: logerMas,
    msg: "HTTP {{req.method}} {{req.url}}",
    winstonInstance: logger,
  });
  
  // Define a function to log errors
  export const logError = (message, error) => {
    errorLogger.error({ message, error });
  };