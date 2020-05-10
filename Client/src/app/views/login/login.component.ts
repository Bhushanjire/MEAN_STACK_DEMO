import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { AuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { stringify } from 'querystring';
import {AuthGuard} from '../../auth.guard';


@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  signInForm: FormGroup;
  user: any;
  constructor(
    private router: Router,
    private authService: AuthService,
    private authGuard : AuthGuard

  ) {

  }
  ngOnInit() {
    this.authGuard.isLoggedIn();
    this.authService.authState.subscribe((user) => {
      this.user = user;
    });
    this.signInForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    })
  }

  signIn() {
    if (this.signInForm.invalid)
      return false
    if (this.signInForm.value.email == 'bhushanjire@gmail.com' && this.signInForm.value.password == '123456') {

      this.router.navigate(['postLogin']);
      console.log('Login Successfull');
    } else {
      console.log('Wrong email/[assword');
    }
  }

  redirect() {
    this.router.navigate(['register']);
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(userDetails => {
      localStorage.setItem('MYAPP_USER', JSON.stringify(userDetails));
      this.router.navigate(['dashboard']);
    }).catch(err => console.log(err));;
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(userDetails => {
      localStorage.setItem('MYAPP_USER', JSON.stringify(userDetails));
      this.router.navigate(['dashboard']);
    }).catch(err => console.log(err));
  }
  signOut(): void {
    this.authService.signOut();
  }

}
