import fs from 'fs';
import { sendEmail } from '../utils/sendEmail';

export interface ILogger {
  log(message: string): void;
}

export function consoleLogger(): ILogger {
  return {
    log: (message: string) => console.log(message)
  }
}

export function fileLogger(fileName: string): ILogger {
  return {
    log: (message: string) => fs.appendFileSync(fileName, `${message}\n`)
  }
}

export function emailLogger(emailRecipient: string): ILogger {
  return {
    log: (message: string) => {
      const emailBody = `Log message: ${message}`;
      const emailOptions = {
          to: emailRecipient,
          subject: 'Log message',
          body: emailBody,
      };
      sendEmail(emailOptions);
    }
  }
}

function foo(logger: ILogger) {
  return {
    bar: (message: string) => {
      logger.log(message);
    }
  }
}

export function app(loggerFactory: () => ILogger, message: string) {
  const logger = loggerFactory();
  const fooInstance = foo(logger);

  return {
    run: () => {
      fooInstance.bar(message);
    }
  };
}

