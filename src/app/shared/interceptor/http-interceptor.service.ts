import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CookieService } from '../service/cookie.service';
import { finalize } from 'rxjs/operators';
import { LoaderService } from '../service/loader.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private readonly cookieService: CookieService,
    private readonly loaderService: LoaderService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.show();
    if (request.headers.get("skip"))
      return next.handle(request).pipe(
        finalize(() => this.loaderService.hide())
      );
    const AuthToken = this.cookieService.getCookie('authorization');

    request = request.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${AuthToken}`,
      },
    });
    return next.handle(request).pipe(
      finalize(() => this.loaderService.hide())
    );

  }

}