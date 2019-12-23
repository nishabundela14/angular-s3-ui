import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LinkResolver implements Resolve<any>{

  constructor(private api: ApiService) { }

  resolve(route: ActivatedRouteSnapshot) {
    console.log("TCL: LinkResolver -> resolve -> route.params.name", route.params.name)
    return this.api.getApiResolver(route.params.name);
  }
}
