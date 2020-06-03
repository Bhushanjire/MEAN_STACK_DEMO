import { Component, OnInit } from '@angular/core';
import { navItems } from '../../_nav';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit {
  public sidebarMinimized = false;
  public navItems = navItems;
  loginUser;

  constructor(
    private router: Router,
    private apiService: ApiService
  ) {

  }

  ngOnInit() {
    this.loginUser = this.apiService.getUserDetails(localStorage.getItem('MYAPP_USER'));
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
  logout() {
    localStorage.removeItem('MYAPP_USER');
    this.router.navigate(['login']);
  }
  redirect(route){
    this.router.navigate([route]);
  }
}
