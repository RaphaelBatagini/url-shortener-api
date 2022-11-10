import { ILogger } from '../logger/interface';

export interface ICacheTool {
  init: (logger: ILogger, host: string, port: number, password: string) => void,
  getCached: (key: string) => Promise<any>,
  setCache: (key: string, value: any, expirationSeconds: number) => Promise<void>,
}