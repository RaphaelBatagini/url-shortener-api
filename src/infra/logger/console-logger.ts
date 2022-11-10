import { ILogger } from "./interface";

export class ConsoleLogger implements ILogger {
  error (message: any, entity?: Error): void {
    console.error(message, entity);
  }

  warning (message: any): void {
    console.warn(message);
  }

  info (message: any): void {
    console.log(message);
  }
}