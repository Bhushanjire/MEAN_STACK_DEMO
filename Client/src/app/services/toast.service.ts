import { Injectable, TemplateRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toasts: any[] = [];

  constructor() { }

  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
    console.log('show function',this.toasts)
  }

  remove(toast) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }

  successMessage(textOrTpl: string){
    this.toasts.push(textOrTpl, { classname: 'bg-success text-light', delay: 10000 } );
  }

  errorMessage(textOrTpl: string){
    this.toasts.push(textOrTpl, { classname: 'bg-danger text-light', delay: 15000 } );
  }
}
