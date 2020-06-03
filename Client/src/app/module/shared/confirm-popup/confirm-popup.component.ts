import { Component, OnInit,ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import {PopupService} from '../../../services/popup.service';

@Component({
  selector: 'app-confirm-popup',
  templateUrl: './confirm-popup.component.html',
  styleUrls: ['./confirm-popup.component.css']
})
export class ConfirmPopupComponent implements OnInit,AfterViewInit {
  @ViewChild("confirmPopupRef",{static : true}) confirmPopupRef: ElementRef;
  bhushan : boolean;
  constructor(
    private popupService : PopupService
  ) { 

  }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void{
      console.log('entry component called',this.confirmPopupRef.nativeElement);
      this.confirmPopupRef.nativeElement.sty;
      this.popupService.getRef(this.confirmPopupRef.nativeElement)
    }

    open(event){
      console.log('event',event);
      
      event.show();

    }
  
  
}
