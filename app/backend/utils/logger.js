const { createLogger, format, transports } = require('winston');

/**
 * Logger configurado con Winston para registrar eventos de la aplicación.
 * @type {import('winston').Logger}
 */
const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  transports: [
    new transports.Console({ format: format.simple() })
  ],
});

module.exports = logger;
