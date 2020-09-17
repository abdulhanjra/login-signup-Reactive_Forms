import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DataService } from './data.service';
// import { AdminAuthService } from '../_services/adminAuth.service';
// import { AuthService } from '../auth.service';


@Injectable()
export class BaseInterceptor implements HttpInterceptor {
  currentUser:any;
  constructor(private dataService: DataService
    // private adminAuthService: AdminAuthService,

  ) { }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add base URL here to request sending to server globally at onee time
    // add authorization header with jwt token if available
    this.currentUser = this.dataService.userValue;
    const isLoggedIn = this.currentUser && this.currentUser.token;
    const isAPIUrl = request.url.startsWith(`http://127.0.0.1:3000`);

    if (isLoggedIn && isAPIUrl) {
      request = request.clone({
          setHeaders: {
              Authorization: `Bearer ${this.currentUser.token}`
          }
      });
    }
    // request = request.clone({ url: `${request.url}` });
    // if (this.currentUser && this.currentUser.token) {
    //   request = request.clone({
    //     setHeaders: {
    //       Authorization: `Bearer ${this.currentUser.token}`
    //     }
    //   });
    // }
    // console.log("In base Intercept")

    return next.handle(request);
  }
}