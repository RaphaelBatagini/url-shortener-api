import { Url } from "@/domain/url";
import { IRepository } from "@/infra/repositories/interface";
import { nanoid } from "nanoid";

export class ShortenUrl {
  constructor(private repository: IRepository<Url>) {}

  async execute(originalUrl: string): Promise<string> {
    const existingUrl: Url = (await this.repository.search({
      originalUrl,
    }))?.shift();

    if (!!existingUrl) {
      return existingUrl.getShortenedUrl();
    }

    const shortenedKey = await this.generateShortenedKey();

    const newUrl = new Url();
    newUrl.setOriginalUrl(originalUrl);
    newUrl.setShortenedKey(shortenedKey);

    await this.repository.persist(newUrl);

    return newUrl.getShortenedUrl();
  }

  async generateShortenedKey(): Promise<string> {
    let colision = true;
    let shortenedKey = '';

    do {
      shortenedKey = nanoid(6);
      const existingUrl = await this.repository.search({ shortenedKey });

      if (existingUrl.length === 0) {
        colision = false;
      }
    } while (colision);

    return shortenedKey;
  }
}
