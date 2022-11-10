import { UrlDatabaseRepository } from "./database-repository";
import { UrlInMemoryRepository } from "./in-memory-repository";
import { IRepository } from "../interface";
import { Url } from "@/domain/url";

export function getUrlRepository(): IRepository<Url> {
  if (process.env.REPOSITORY_TYPE === 'memory') {
    return new UrlInMemoryRepository();
  }

  return new UrlDatabaseRepository();
}