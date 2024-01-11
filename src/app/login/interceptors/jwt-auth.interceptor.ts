import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { from, lastValueFrom, Observable } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class JwtAuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.handle(request, next));
  }

  private async handle(request: HttpRequest<any>, next: HttpHandler) {
    let authRequest: HttpRequest<any>;
    let bearer = this.authService.getToken();
    if (bearer) {
      authRequest = request.clone({ setHeaders: { Authorization: `Bearer ${bearer}` } });
    }
    else {
      authRequest = request.clone();
    }
    return lastValueFrom(next.handle(authRequest));
  }
}
