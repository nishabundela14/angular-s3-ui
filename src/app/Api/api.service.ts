import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { throwError, from } from 'rxjs';
import { catchError, tap, retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public first: string = '';
  public last: string = '';
  public next: string = '';
  public prev: string = '';
  
  private SERVER_URL = "http://localhost:3000/";
  constructor(private http: HttpClient) { }

  public get() {
    return this.http.get(`${this.SERVER_URL}products`, {params: new HttpParams({
      fromString: "_page=1&_limit=20"
    }),observe: "response"}).pipe(
      retry(3),
      catchError(this.HandleError),
      tap(res => {
        // add intercept and comment this
      console.log("TCL: ApiService -> get -> res", res.headers.get('Link'));
      this.parseLinkHeaders(res.headers.get('Link'));
      })
    );
  }

  private HandleError(error: HttpErrorResponse) {
    let errMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      //client side
      errMessage = `Error: ${error.error.message}`;
    } else {
      errMessage = `Error code:  ${error.status} message\n: ${error.message}`;
    }

    window.alert(errMessage);
    return throwError(errMessage);
  }

  private parseLinkHeaders(header) {
    if (header.length === 0) {
      return;
    }

    let parts = header.split(",");
    let links = {};
    parts.forEach(p => {
      let sec = p.split(";");
      let url = sec[0].replace(/<(.*)>/, '$1').trim();
      let name = sec[1].replace(/rel="(.*)"/, '$1').trim();
      links[name]=url;
    });
    this.first = links["first"];
    this.last = links["last"];
    this.prev = links["prev"];
    this.next = links["next"];
  }

  public getRequestToURl(url : string) {
    return this.http.get(url, {observe: "response"}).pipe(
      retry(3),
      catchError(this.HandleError),
      tap(res => {
      console.log("TCL: ApiService -> get -> res", res.headers.get('Link'));
      this.parseLinkHeaders(res.headers.get('Link'));
      })
    );
  }

  public getApiResolver(name: string) {
    console.log("TCL: getApiResolver -> name", name);
  }
}
