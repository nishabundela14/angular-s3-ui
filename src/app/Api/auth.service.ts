import { Injectable } from '@angular/core';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  public loginApp(userinfo: User) {
    localStorage.setItem("ACCESS_TOKEN", 'testing');
  }

  public isLoggedIn() {
    return localStorage.getItem("ACCESS_TOKEN") !== null;
  }

  public logoutApp() {
    localStorage.removeItem("ACCESS_TOKEN");
  }
}
