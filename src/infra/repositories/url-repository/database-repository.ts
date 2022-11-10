import { Url } from "@/domain/url";
import { UrlModel, getUrlRepository } from "@/infra/database/models/url";
import { DatabaseRepository } from "../database-repository";

export class UrlDatabaseRepository extends DatabaseRepository<Url, UrlModel> {
  constructor() {
    super(
      getUrlRepository(),
      (model: UrlModel): Url => {
        return new Url(model.id, model.originalUrl, model.shortenedKey);
      },
      (type: Url): UrlModel => {
        const model = new UrlModel();
        model.id = !!type.getId() ? Number(type.getId()) : 0;
        model.originalUrl = type.getOriginalUrl();
        model.shortenedKey = type.getShortenedKey();
        return model;
      },
    );
  }
}
