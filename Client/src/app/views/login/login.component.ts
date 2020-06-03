import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthGuard } from '../../auth.guard';
import { ApiService } from '../../services/api.service';
import { ResponceFormat } from '../../constant/';
import { SocialSiteLoginService } from '../../services/social-site-login.service';
import { ToastService } from '../../services/toast.service';


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
    private socialSiteLoginService: SocialSiteLoginService,
    private authGuard: AuthGuard,
    private apiService: ApiService,
    private toastService: ToastService

  ) {

  }
  ngOnInit() {
    this.authGuard.isLoggedIn();
    this.signInForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    })
  }

  signIn() {
    if (this.signInForm.invalid)
      return false

    let postData = {
      data: {
        emailId: this.signInForm.value.email,
        password: this.signInForm.value.password
      }
    }

    this.apiService.login('LOGIN', postData).subscribe((responce: ResponceFormat) => {
      if (responce.isSuccess) {
        localStorage.setItem('MYAPP_USER', responce.data);
        this.toastService.successMessage(responce.messages);
        this.router.navigate(['dashboard']);
      } else {
        this.toastService.errorMessage(responce.messages);
      }
    }, error => {
      this.toastService.errorMessage(error);
      console.log('Error', error);
    });
  }

  redirect() {
    this.router.navigate(['register']);
  }

  signInWithGoogle(): void {
    this.socialSiteLoginService.loginSignUpGoogle(userDetails => {
      // console.log('loginSignUpGoogle',userDetails);
      
      let postData = {
        data: {
          userDetails: userDetails,
          siteName: 'google'
        }
      }
      this.apiService.request('LOGIN_WITH_SOCIAL_SITE', postData).subscribe(tokenReaponce => {
        localStorage.setItem('MYAPP_USER', JSON.stringify(tokenReaponce));
        this.router.navigate(['dashboard']);
      });
    })
  }

  signInWithFB(): void {
    this.socialSiteLoginService.loginSignUpFacebook(userDetails => {
      let postData = {
        data: {
          userDetails: userDetails.facebook,
          siteName: 'facebook'
        }
      }
      this.apiService.request('LOGIN_WITH_SOCIAL_SITE', postData).subscribe(tokenReaponce => {
        localStorage.setItem('MYAPP_USER', JSON.stringify(tokenReaponce));
        this.router.navigate(['dashboard']);
      });
    })
  }
  signOut(): void {
    // this.authService.signOut();
  }

  showStandard() {
    this.toastService.show('I am a standard toast');
  }

  showSuccess() {
    this.toastService.show('I am a success toast', { classname: 'bg-success text-light', delay: 10000 });
  }

  showDanger(dangerTpl) {
    this.toastService.show(dangerTpl, { classname: 'bg-danger text-light', delay: 15000 });
  }

}
