import { Url } from "@/domain/url";
import { IRepository } from "@/infra/repositories/interface";

export class GetOriginalUrlByShortenedKey {
  constructor(private repository: IRepository<Url>) {}

  async execute(shortenedKey: string): Promise<string> {
    const existingUrl: Url = (await this.repository.search({
      shortenedKey,
    }))?.shift();

    if (!existingUrl) {
      const urlNotFound = new Url();
      urlNotFound.setShortenedKey(shortenedKey);
      throw new UrlNotFoundError(urlNotFound.getShortenedKey());
    }
    
    return existingUrl.getOriginalUrl();
  }
}

export class UrlNotFoundError extends Error {
  constructor(url?: string) {
    super(`Url for key ${url} not found`);
    this.name = 'UrlNotFoundError';
  }
}
