import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { ApiResponse } from '../../../services/api.service';
import { UserModel } from '../../../models/user.model';


@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  userList: UserModel;
  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.apiService.request('ALL_USER').subscribe((responce: ApiResponse) => {
      if (responce.isSuccess) {
        this.userList = responce.data;
        console.log('responce', responce);
      }
    });
  }
}
