import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NotificationService } from '../app/services/notification.service';

@Component({
  // tslint:disable-next-line
  selector: 'body',
  // template: "<button type='button' (click)='sendNotification()'>Send Notification</button> <router-outlet></router-outlet> "
  template: "<router-outlet></router-outlet> "
})
export class AppComponent implements OnInit {
  title = 'push-notification';
  message;
  constructor(
    private router: Router,
    private notificationService: NotificationService) { }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });

    this.notificationService.requestPermission()
    this.notificationService.receiveMessage()
    this.message = this.notificationService.currentMessage.next('new message');
  }

  sendNotification(){
    var i=0;
    this.message = this.notificationService.currentMessage.next(i++);
    console.log('function called');
    
  }
}
