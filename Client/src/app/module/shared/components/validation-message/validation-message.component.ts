import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-validation-message',
  templateUrl: './validation-message.component.html',
  styleUrls: ['./validation-message.component.css']
})
export class ValidationMessageComponent implements OnInit {
@Input() errorMessage: string;
  constructor() { }
  ngOnInit(): void {
  }

}
