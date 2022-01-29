const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file');
const dotenv = require('dotenv');
const fs = require('fs');

dotenv.config();

const loggerLevel = process.env.LOGGER_LEVEL || 'info';

const logDir = 'log';

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const dailyRotateFileTransport = new transports.DailyRotateFile({
  filename: `${logDir}/%DATE%.log`,
  datePattern: 'YYYY-MM-DD',
  format: format.combine(
    format.printf(
      (info) => `${info.timestamp}[${info.level}] ${info.message}`,
    ),
  ),
});

const logger = createLogger({
  level: loggerLevel,
  format: format.combine(
    // format.label({ label: 'label123' }),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
    format.json(),
  ),
  transports: [
    new transports.Console({
      level: loggerLevel,
      format: format.combine(
        format.colorize(),
        format.printf(
          (info) => `${info.timestamp}[${info.level}] ${info.message}`,
        ),
      ),
    }),
    dailyRotateFileTransport,
  ],
});

module.exports = logger;
