import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PaginatorComponent } from './paginator/paginator.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ConfirmPopupComponent } from './confirm-popup/confirm-popup.component';
import { NgBoostrapModule } from '../../module/shared/ng-boostrap/ng-boostrap.module';

@NgModule({
  declarations: [PaginatorComponent, ConfirmPopupComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    NgBoostrapModule
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    ConfirmPopupComponent,
    NgBoostrapModule,
  ],
  entryComponents: [
    ConfirmPopupComponent
  ]
})
export class SharedModule { }
