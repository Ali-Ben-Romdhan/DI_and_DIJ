import { app, ILogger, consoleLogger, fileLogger } from '../src/Functions/logger';
import fs from "fs"
describe('app', () => {
  const message = 'test message';

  it('creates logger instance and logs message', () => {
    const logger: ILogger = {
      log: jest.fn(),
    };
    const loggerFactory = jest.fn(() => logger);

    const appInstance = app(loggerFactory, message);

    appInstance.run();

    expect(loggerFactory).toHaveBeenCalledTimes(1);
    expect(loggerFactory).toHaveBeenCalledWith();
    expect(logger.log).toHaveBeenCalledTimes(1);
    expect(logger.log).toHaveBeenCalledWith(message);
  });

  it('uses console logger by default', () => {
    const consoleSpy = jest.spyOn(console, 'log');

    const appInstance = app(consoleLogger, message);

    appInstance.run();

    expect(consoleSpy).toHaveBeenCalledTimes(1);
    expect(consoleSpy).toHaveBeenCalledWith(message);
  });


  describe('fileLogger', () => {
    const fileName = 'test.log';

    afterEach(() => {
      // Remove the test file after each test
      fs.unlinkSync(fileName);
    });

    it('should log messages to a file', () => {
      const logger = fileLogger(fileName);
      logger.log('Test message');
      
      const content = fs.readFileSync(fileName, 'utf-8');
      expect(content).toContain('Test message');
    });
  });

 
});







