import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Observable, catchError, throwError } from "rxjs";
import { Location } from '@angular/common';
import { AuthService } from "../services/auth.service";
import { SweetService } from "../../core/sweet.service";

@Injectable()
export class ErrorJwtInterceptor implements HttpInterceptor {
  constructor(
    private navCtrl: NavController,
    private sweetService: SweetService,
    private authService: AuthService,
    private location: Location) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError(
          (error: HttpErrorResponse) => {
            const url: string = this.location.prepareExternalUrl(this.location.path());
            if (error && error.status == 401 && !url.includes("login")) {
              this.sweetService.showToast("La tua sessione è scaduta", "error");
              this.navCtrl.navigateRoot("/login");
              this.authService.logout();
            }
            return throwError(new Error("SESSION_EXPIRED"));
          })
      )
  }
}
