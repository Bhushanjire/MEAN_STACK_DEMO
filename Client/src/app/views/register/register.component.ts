import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormGroup, FormControl, Validators,FormBuilder } from '@angular/forms';
import { SocialSiteLoginService } from '../../services/social-site-login.service';
import { ResponceFormat } from '../../constant/';
import {MustMatch} from '../../../app/validators/custom.validator'


@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  constructor(
    private apiService: ApiService,
    private socialSiteLoginService: SocialSiteLoginService,
    private formBuilder : FormBuilder
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      emailId: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required)
    },{
      validators : MustMatch('password','confirmPassword')
    });
  }

  register() {
    console.log('registerForm', this.registerForm);
    if (this.registerForm.valid) {
      let postData = {
        data: {
          firstName: this.registerForm.controls.firstName.value,
          lastName: this.registerForm.controls.lastName.value,
          emailId: this.registerForm.controls.emailId.value,
          password: this.registerForm.controls.password.value
        }
      }
      this.apiService.register('REGISTER', postData).subscribe((responce: ResponceFormat) => {
        console.log('REGISTER', responce);
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
  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }
      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }
}
