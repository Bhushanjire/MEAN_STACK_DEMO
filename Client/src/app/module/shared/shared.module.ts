import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PaginatorComponent } from './paginator/paginator.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ConfirmPopupComponent } from './confirm-popup/confirm-popup.component';
import { NgBoostrapModule } from '../../module/shared/ng-boostrap/ng-boostrap.module';
import { ValidationMessageComponent } from './components/validation-message/validation-message.component';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { environment } from './../../../environments/environment';
import {NotificationService} from '../../services/notification.service';


@NgModule({
  declarations: [PaginatorComponent, ConfirmPopupComponent, ValidationMessageComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    NgBoostrapModule,
    AngularFireDatabaseModule,
      AngularFireAuthModule,
      AngularFireMessagingModule,
      AngularFireModule.initializeApp(environment.firebase),
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    ConfirmPopupComponent,
    NgBoostrapModule,
    ValidationMessageComponent,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireMessagingModule,
  ],
  entryComponents: [
    ConfirmPopupComponent
  ],
  providers: [NotificationService],

})
export class SharedModule { }
