import { Routes } from "@/adapter/http/routes";
import { ILogger } from "../logger/interface";

export interface IServer {
  init: (port: number, routes: Routes, logger: ILogger, allowedOrigins?: string[]) => Promise<void>;
}