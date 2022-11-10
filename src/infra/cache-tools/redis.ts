import { createClient, RedisClientType } from 'redis';
import { ILogger } from '../logger/interface';
import { ICacheTool } from './interface';

export class Redis implements ICacheTool {
  private client: RedisClientType;
  private logger: ILogger;

  init(logger: ILogger, host: string, port: number, password: string): void {
    this.logger = logger;
    this.client = createClient({
      socket: {
        host: host,
        port: port,
      },
      password,
      legacyMode: true,
    });
    this.client.connect();
    this.client.on('error', (error) => {
      this.logger.error(error.message, error);
    });
  }

  async getCached(key: string): Promise<any> {
    const value = await this.client.get(key);

    if (value === undefined) {
      return;
    }

    try {
      this.logger.info(`${key} returned from cache`);
      return value;
    } catch (error) {
      this.logger.warning(`Fail to decode JSON ${value}`);
      return value;
    }
  }

  async setCache(key: string, value: any, expirationSeconds: number): Promise<void> {
    await this.client.set(key, value, {
      EX: expirationSeconds,
    });
    this.logger.info(`${key} added to cache`);
  }
}
