//After Applying Dependency Injection
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
      // Code to send email with the log message
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
//Yes, here also we applied DIJ
  constructor(logger: ILogger) {
      this.logger = logger;
  }

  processMessage(message: string): void {
      this.logger.log(message);
  }
}

export class App {
  private messageProcessor: MessageProcessor;

/*
In this code, dependency injection is applied through the constructor of the App class.
When an instance of App is created, a logger object implementing the ILogger interface
is passed as an argument to the constructor.

The messageProcessor property of the App instance is then
assigned a new instance of the MessageProcessor class,
which takes the logger object as a constructor argument.
This way, the MessageProcessor instance has access to
the logger object and can use its log() method to log messages.

By using constructor injection, the App class is not responsible
for creating its own dependencies, and the logger object can be easily replaced with a different implementation
of the ILogger interface without modifying the App class.
This makes the code more flexible and easier to maintain.

*/
  constructor(logger: ILogger) {
      this.messageProcessor = new MessageProcessor(logger);
  }

  start(message: string): void {
      this.messageProcessor.processMessage(message);
  }
}
