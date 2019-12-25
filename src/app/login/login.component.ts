import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { User } from '../interface/user';
import { AuthService} from '../Api/auth.service'
import { MessageService } from '../Api/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public isSubmitted: boolean = false;
  constructor( private auth: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private mess: MessageService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email:['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get formControls() {
    return this.loginForm.controls;
  }

  public submitLogin() {
    console.log(this.loginForm.value);
    this.isSubmitted = true;

    if( this.loginForm.invalid) {
      return;
    }

    this.auth.loginApp(this.loginForm.value);
    this.router.navigateByUrl('/home');
    this.mess.sendMessage(true);
    this.mess.clearMessage();
  }

}
