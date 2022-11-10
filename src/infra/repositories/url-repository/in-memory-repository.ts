import { Url } from "@/domain/url";
import { InMemoryRepository } from "../in-memory-repository";

export class UrlInMemoryRepository extends InMemoryRepository<Url> {
  constructor() {
    super((entity: { id?: string, originalUrl?: string, shortenedUrl?: string }) => {
      console.log(entity)
      const url = new Url();
      url.setId(entity.id);
      url.setOriginalUrl(entity.originalUrl);
      url.setShortenedKey(entity.shortenedUrl);
      return url;
    });
  }
}
