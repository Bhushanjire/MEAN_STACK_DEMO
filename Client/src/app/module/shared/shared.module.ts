import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PaginatorComponent } from './paginator/paginator.component';

@NgModule({
  declarations: [PaginatorComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  exports : [
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ]
})
export class SharedModule { }
