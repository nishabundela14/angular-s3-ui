import { Injectable, Injector } from '@angular/core';
import { Observable, of} from 'rxjs';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import * as data from '../../../server/data.json';

@Injectable({
  providedIn: 'root'
})
export class HttpsInterceptorService implements HttpInterceptor{
  public PRODUCTS_URL = "http://localhost:3000/products";
  constructor(private injector: Injector) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   console.log("TCL: HttpsInterceptorService -> constructor -> req", req.url);
  // if (this.PRODUCTS_URL === req.url) {
  //   console.log("load from json", req.url);
  //   return of(new HttpResponse({status: 200, body: ((data) as any).default }));
  // }
   return next.handle(req);
  }
}
