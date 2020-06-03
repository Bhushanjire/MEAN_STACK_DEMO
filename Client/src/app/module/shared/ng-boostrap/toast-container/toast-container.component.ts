import { Component, OnInit,TemplateRef,ViewEncapsulation } from '@angular/core';
import {ToastService} from '../../../../services/toast.service';

@Component({
  selector: 'app-toast-container',
  templateUrl: './toast-container.component.html',
  styleUrls: ['./toast-container.component.css'],
  host: {'[class.ngb-toasts]': 'true'},
  encapsulation: ViewEncapsulation.None
})
export class ToastContainerComponent implements OnInit {

  constructor(public toastService: ToastService) {}

  isTemplate(toast) { return toast.textOrTpl instanceof TemplateRef; }

  ngOnInit(): void {
  }

}
