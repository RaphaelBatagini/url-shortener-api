import { FindUrlByShortenedKey, UrlNotFoundError } from "@/application/find-url-by-shortened-key";
import { ShortenUrl } from "@/application/shorten-url";
import { logger } from "@/infra/logger";
import { getUrlRepository } from "@/infra/repositories";
import httpStatus from "http-status";
import { Http } from "./interface";

export class UrlController {
  // TODO: move the getUrlRepository to infrastructure level and receive this in constructor
  async shorten(request: Http.Request, response: Http.Response) {
    try {
      const repository = getUrlRepository();
      const useCase = new ShortenUrl(repository);

      const result = await useCase.execute(request.params.originalUrl);
  
      return response.status(httpStatus.OK).send({ result });
    } catch (error) {
      logger.error(error.message, error);
      return response.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }

  async redirect(request: Http.Request, response: Http.Response) {
    try {
      const repository = getUrlRepository();
      const useCase = new FindUrlByShortenedKey(repository);

      const result = await useCase.execute(request.params.shortenedKey);

      response.redirect(result);
    } catch (error) {
      logger.error(error.message, error);

      if (error instanceof UrlNotFoundError) {
        return response.status(httpStatus.NOT_FOUND);  
      }

      return response.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }
};
