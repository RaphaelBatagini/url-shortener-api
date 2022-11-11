import { Routes } from "@/adapter/http/routes";
import { ILogger } from "../logger/interface";
import { ExpressWebServer } from "./express";
import { IServer } from "./interface";

export class WebServer {
  private server: IServer;

  constructor(server: IServer) {
    this.server = server;
  }

  async init(port: number, routes: Routes, logger: ILogger, allowedOrigins?: string[]): Promise<void> {
    await this.server.init(port, routes, logger, allowedOrigins);
  }
}

export function getWebServer() {
  const server = new ExpressWebServer();
  return new WebServer(server);
}