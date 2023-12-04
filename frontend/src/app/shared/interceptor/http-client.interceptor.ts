import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from "rxjs/operators";
import {Router} from "@angular/router";
import {PagesConfig} from "@app/configs/pages.config";

@Injectable()
export class HttpClientInterceptor implements HttpInterceptor {

  constructor(private router: Router) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap(
        {
          error: err => {
            if (err.status === 504) {
              this.router.navigateByUrl(PagesConfig.errors["504"])
            }
          }
        }
      )
    );
  }
}
