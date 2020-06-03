import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { ApiResponse } from '../../../services/api.service';
import { UserModel } from '../../../models/user.model';
import { ApiParam } from '../../../services/api.service';
import {PopupService} from '../../../services/popup.service';




@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
  pageSize = 5;
  currentPage = 1;
  totalRecords = 0;
  userList: UserModel;
  searchText = null;
  constructor(
    private apiService: ApiService,
    private popupService : PopupService
  ) { }

  ngOnInit(): void {
    this.getUserList();
  }

  pageChanged(event) {
    this.currentPage = event;
    this.getUserList();
  }

   async getUserList() {
    let postData: ApiParam = {
      data: {
        offset: this.currentPage,
        pageSize: this.pageSize,
        searchText : this.searchText
      }
    }
    this.apiService.request('ALL_USER',postData).subscribe((responce: ApiResponse) => {
      if (responce.isSuccess) {
        this.userList = responce.data.users;
        this.totalRecords = responce.data.totalRecords;
      }
    });
  }

  searchRecord(text){
    this.searchText = text;
    this.getUserList();
  }

  isDelete(){
    this.popupService.openConfirmPopup()
  }
}
