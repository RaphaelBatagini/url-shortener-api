import { UrlController } from "./url-controller";

export const routes: Routes = [
  {
    method: 'GET',
    path: '/api/shorten-url/:originalUrl',
    handler: UrlController.prototype.shorten,
  },
  {
    method: 'GET',
    path: '/api/original-url/:shortenedKey',
    handler: UrlController.prototype.getOriginalUrl,
  },
];

export type Routes = {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'USE' | 'ANY',
  path: string,
  handler: CallableFunction,
}[];
