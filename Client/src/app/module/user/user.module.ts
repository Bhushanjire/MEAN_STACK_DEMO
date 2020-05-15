import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListUserComponent } from './list-user/list-user.component';
import { AddUpdateUserComponent } from './add-update-user/add-update-user.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserComponent } from './user/user.component';
import { Routes, RouterModule } from '@angular/router';
import {SharedModule} from '../shared/shared.module'


export const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: 'list',
        component: ListUserComponent,
        data: {
          title: 'User List'
        }
      },
      {
        path: 'add-update',
        component: AddUpdateUserComponent,
        data: {
          title: 'Add-Update'
        }
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent,
        data: {
          title: 'Change Password'
        }
      },
      {
        path: 'profile',
        component: UserProfileComponent,
        data: {
          title: 'Profile'
        }
      },
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  declarations: [
    ListUserComponent,
    AddUpdateUserComponent,
    ChangePasswordComponent,
    UserProfileComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class UserModule { }
