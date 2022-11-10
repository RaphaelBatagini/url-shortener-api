import { ICacheTool } from "./interface";
import { logger } from "../logger";
import { Redis } from "./redis";
import { loadEnvironmentVariables } from "../config/setup";

export class CacheManager {
  constructor(private readonly cacheTool: ICacheTool) {
    loadEnvironmentVariables();
    
    if (this.isActive()) {
      this.cacheTool.init(logger, process.env.CACHE_HOST, Number(process.env.CACHE_PORT), process.env.CACHE_PASS);
    }
  }
  
  private isActive() {
    const active = !!process.env.CACHE_HOST && !!process.env.CACHE_PORT && !!process.env.CACHE_PASS;
    return active;
  }

  async get(key: string): Promise<any> {
    if (!this.isActive()) {
      return;
    }

    return this.cacheTool.getCached(key);
  }

  async set(key: string, value: any, expirationSeconds: number): Promise<void> {
    if (!this.isActive()) {
      return;
    }
    
    await this.cacheTool.setCache(key, value, expirationSeconds);
  }
}

const cacheTool = new Redis();
export const cacheManager = new CacheManager(cacheTool);