import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastContainerComponent } from './toast-container/toast-container.component';

@NgModule({
  declarations: [ToastContainerComponent],
  imports: [
    CommonModule,
    NgbToastModule
  ],
  exports: [
    NgbToastModule,
    ToastContainerComponent
  ]
})
export class NgBoostrapModule { }
