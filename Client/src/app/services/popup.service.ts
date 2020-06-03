import { Injectable } from '@angular/core';
import { ConfirmPopupComponent } from '../../app/module/shared/confirm-popup/confirm-popup.component'

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor() { }

  confirmModalRef: any;

  getRef(confirmPopupRef) {
    this.confirmModalRef = confirmPopupRef;
    console.log('service called',this.confirmModalRef);
    
  }

  openConfirmPopup() {
    this.confirmModalRef.show();
  }
}



