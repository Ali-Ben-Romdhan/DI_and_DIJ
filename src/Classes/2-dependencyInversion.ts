//After Applying Dependency Inversion
import fs from 'fs';
import { sendEmail } from '../utils/sendEmail';

interface ILogger {
  log(message: string): void;
}

class ConsoleLogger implements ILogger {
  log(message: string): void {
      console.log(message);
  }
}

class FileLogger implements ILogger {
  private fileName: string;

  constructor(fileName: string) {
      this.fileName = fileName;
  }

  log(message: string): void {
    fs.appendFileSync(this.fileName, `${message}\n`);
  }
} 

class EmailLogger implements ILogger {
  private emailRecipient: string;

  constructor(emailRecipient: string) {
      this.emailRecipient = emailRecipient;
  }

  public log(message: string): void {
      const emailBody = `Log message: ${message}`;
      const emailOptions = {
          to: this.emailRecipient,
          subject: 'Log message',
          body: emailBody,
      };
      sendEmail(emailOptions);
  }
}

class MessageProcessor {
  private logger: ILogger;

  constructor(logger: ILogger) {
      this.logger = logger;
  }

  processMessage(message: string): void {
      this.logger.log(message);
  }
}

export class App {
  private messageProcessor: MessageProcessor;

  constructor() {
    //Here u can pass an instance of any object that implements ILogger interface
    const logger = new ConsoleLogger();
      this.messageProcessor = new MessageProcessor(logger);
  }

  start(message: string): void {
      this.messageProcessor.processMessage(message);
  }
}
