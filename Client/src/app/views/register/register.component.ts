import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SocialSiteLoginService } from '../../services/social-site-login.service';
import { ResponceFormat } from '../../constant/';


@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  constructor(
    private apiService: ApiService,
    private socialSiteLoginService: SocialSiteLoginService
  ) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      emailId: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required)
    });
  }

  register() {

    console.log('registerForm',this.registerForm);
    
    if (this.registerForm.valid) {
      let postData = {
        data: {
          firstName : this.registerForm.controls.firstName.value,
          lastName : this.registerForm.controls.lastName.value,
          emailId : this.registerForm.controls.emailId.value,
          password : this.registerForm.controls.password.value
        }
      }
      this.apiService.register('REGISTER', postData).subscribe((responce : ResponceFormat) => {
        console.log('REGISTER',responce);
      });
    }
  }

  signUpWithSocialSite(siteName) {
    switch (siteName) {
      case 'google':
        this.socialSiteLoginService.loginSignUpGoogle(userDetails => {
          let postData = {
            data: {
              firstName: userDetails.firstName,
              lastName: userDetails.lastName,
              emailId: userDetails.email,
            }
          }
          this.apiService.register('REGISTER', postData).subscribe(registerResponce => {
            console.log('registerResponce', registerResponce);
          });
          console.log('Google User', userDetails);
        });
        break;

      case 'facebook':
        this.socialSiteLoginService.loginSignUpFacebook(userDetails => {
          let postData = {
            data: {
              firstName: userDetails.firstName,
              lastName: userDetails.lastName,
              emailId: userDetails.email,
            }
          }
          this.apiService.register('REGISTER', postData).subscribe(registerResponce => {
            console.log('registerResponce', registerResponce);
          });
          console.log('Facebook User', userDetails);
        });
        break;
    }

  }

}
