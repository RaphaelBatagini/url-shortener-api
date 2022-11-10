import { ConsoleLogger } from "./console-logger";
import { ILogger } from "./interface";

export const logger: ILogger = new ConsoleLogger();