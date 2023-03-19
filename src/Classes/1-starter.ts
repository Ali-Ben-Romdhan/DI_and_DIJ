import { greeting } from "../../tests/greeting.test";

//Before Applying Dependency Inversion
class ConsoleLogger {
  log(message: string): void {
      console.log(message);
  }
}


export class MessageProcessor {
  private logger: ConsoleLogger;

  constructor() {
    this.logger = new ConsoleLogger();
  }

  processMessage(): void {
      this.logger.log(greeting("Hello world!"));
  }
}



 export class MyApp {
  private messageProcessor: MessageProcessor;

  constructor() {
      this.messageProcessor = new MessageProcessor();
  }

  start(): void {
      this.messageProcessor.processMessage();
  }
}


