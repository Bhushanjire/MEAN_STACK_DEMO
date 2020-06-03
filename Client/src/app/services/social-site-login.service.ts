import { Injectable } from '@angular/core';
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { AuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { stringify } from 'querystring';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocialSiteLoginService {

  constructor(
    private authService: AuthService,
  ) {

    this.authService.authState.subscribe((user) => {
    });
  }

  loginSignUpGoogle(callback): any {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(userDetails => {
      callback(userDetails)
    }).catch(err => console.log(err))
  }

  loginSignUpFacebook(callback): any {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(userDetails => {
      callback(userDetails)
    }).catch(err => console.log(err))
  }
}
