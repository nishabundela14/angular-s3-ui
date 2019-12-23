import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Api/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.sass']
})
export class AdminComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  public logoutApps() {
    this.auth.logoutApp();
    this.router.navigateByUrl("/login");
  }

}
