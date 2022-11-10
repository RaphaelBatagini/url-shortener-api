import 'express-async-errors';

import express, { Request, Response, NextFunction, Router } from 'express';
import httpStatus from 'http-status';
import { Routes } from '@/adapter/http/routes';
import { IServer } from './interface';
import { ILogger } from '../logger/interface';
import swaggerUi from "swagger-ui-express";
import { cacheManager } from '../cache-tools';
const swaggerDocument = require('./../../../swagger.json');

export class ExpressWebServer implements IServer {
  readonly server = express();
  private logger: ILogger;
  private routes: Routes;

  async init(port: number, routes: Routes, logger: ILogger) {
    this.routes = routes;
    this.logger = logger;
    await this.routersSetup();
    this.listen(port, () => {
      this.logger.info(`Listening on port ${port}`);
    });
  }

  listen(port: number, callback: () => void): void {
    this.server.listen(port, callback);
  }

  private async routersSetup(): Promise<void> {
    const router = Router();

    this.setupLogs(router);
    this.setupDocs(router);
    // this.setupCache(router);

    this.routes.forEach(route => {
      const method = route.method.toLowerCase() === 'any' ? 'all' : route.method.toLowerCase();
      router[method](route.path, (req: Request, res: Response) => route.handler(req, res));
    });
    this.server.use(router);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    this.server.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
      const status = httpStatus.INTERNAL_SERVER_ERROR;

      this.logger.error('Request/Response Error', error);
      res.status(status).json(error);
    });
  }

  private setupLogs(router: Router): void {
    router.use((req: Request, res: Response, next: NextFunction) => {
      const date = new Date();
      this.logger.info(`[${date.toISOString()}] ${req.method}:${req.url} ${res.statusCode}`);
      next();
    });
  }

  private setupDocs(router: Router): void {
    router.use('/docs', swaggerUi.serve);
    router.get('/docs', swaggerUi.setup(swaggerDocument));
  }

  private setupCache(router: Router): void {
    router.use(async (req: Request, res: Response, next: NextFunction) => {
      const cacheKey = `cached_route_${req.url || req.originalUrl }`;
      const cachedResult = await cacheManager.get(cacheKey);
      if (!!cachedResult) {
        res.status(httpStatus.OK).send(cachedResult);
        return;
      }

      let sendResponse = res.send;
      // @ts-ignore
      res.send = async function (body) {
        await cacheManager.set(cacheKey, res.send(), 60);
        sendResponse.apply(res, arguments);
      }
      next();
    });
  }
}
