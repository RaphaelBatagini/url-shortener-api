import { UrlController } from "./url-controller";

export const routes: Routes = [
  {
    method: 'GET',
    path: '/api/shorten-url/:originalUrl',
    handler: UrlController.prototype.shorten,
  },
  {
    method: 'ANY',
    path: '/:shortenedKey',
    handler: UrlController.prototype.redirect,
  },
];

export type Routes = {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'USE' | 'ANY',
  path: string,
  handler: CallableFunction,
}[];
