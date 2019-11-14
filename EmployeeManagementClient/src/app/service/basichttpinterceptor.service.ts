import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BasichttpinterceptorService implements HttpInterceptor {

  constructor(private router: Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler) {

    if (sessionStorage.getItem('username') && sessionStorage.getItem('token')) {
      req = req.clone({
        setHeaders: {
          Authorization: sessionStorage.getItem('token')
        }
      })
    }
    // if (sessionStorage.getItem('username') && sessionStorage.getItem('basicauth')) {
    //   req = req.clone({
    //     setHeaders: {
    //       Authorization: sessionStorage.getItem('basicauth')
    //     }
    //   })
    // } else {
    //   this.router.navigate(['']);
    // }

    return next.handle(req);

  }
}
