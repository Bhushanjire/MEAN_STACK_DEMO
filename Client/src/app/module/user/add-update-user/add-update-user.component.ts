import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ApiService, ApiResponse } from "../../../services/api.service";
import { UserModel } from "../../../models/user.model";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";

@Component({
  selector: "app-add-update-user",
  templateUrl: "./add-update-user.component.html",
  styleUrls: ["./add-update-user.component.css"],
})
export class AddUpdateUserComponent implements OnInit {
  userId = null;
  userForm: FormGroup;
  userData: UserModel;
  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      emailId: new FormControl(null, Validators.required),
      mobileNo: new FormControl(null, Validators.required),
    });
    this.activatedRoute.paramMap.subscribe((param) => {
      this.userId = param["params"].id;
      let postData = {
        data: {
          userId: this.userId,
        },
      };

      this.apiService.request("GET_USER_BY_ID", postData).subscribe(
        (responce: ApiResponse) => {
          if (responce.isSuccess) {
            this.userData = responce.data;
            this.userForm.patchValue({
              firstName: this.userData.firstName,
              lastName: this.userData.lastName,
              emailId: this.userData.emailId,
              mobileNo: this.userData.mobileNo,
            });
          }
        },
        (error) => {
          console.log("Error in GET_USER_BY_ID", error);
        }
      );
    });
  }

  addUpdateUser() {
    if (this.userForm.valid) {
      let postdata = {
        data: {
          userId: this.userData._id,
          userData: {
            firstName: this.userForm.controls.firstName.value,
            lastName: this.userForm.controls.lastName.value,
            emailId: this.userForm.controls.emailId.value,
            mobileNo: this.userForm.controls.mobileNo.value,
          },
        },
      };

      this.apiService.request("UPDATE_USER", postdata).subscribe(
        (responce: ApiResponse) => {
          if (responce.isSuccess) {
            this.router.navigate(["/dashboard/user/list"]);
            console.log("User updated successfully");
          }
        },
        (error) => {
          console.log("Error in UPDATE_USER", error);
        }
      );
      console.log("userForm", this.userForm);
    }
  }
}
