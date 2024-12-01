import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, InjectionToken, inject } from '@angular/core';

export const BASE_URL = new InjectionToken<string>('BASE_URL');

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {
  constructor() {}
  private readonly baseUrl = inject(BASE_URL, { optional: true });

  intercept(req: HttpRequest<unknown>, next: HttpHandler) {
    return next.handle(req.clone({ url: this.prependBaseUrl(req.url) }));
  }

  private prependBaseUrl(url: string) {
    const e = [this.baseUrl?.replace(/\/$/g, ''), url.replace(/^\.?\//, '')]
      .filter((val) => val)
      .join('/');
    return e;
  }
}
