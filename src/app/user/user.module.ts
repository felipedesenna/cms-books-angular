import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AddUserComponent } from './add-user/add-user.component';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'login', component: LoginComponent },
      { path: 'users', component: AddUserComponent }
    ])
  ],
  declarations: [
    LoginComponent,
    AddUserComponent
  ]
})
export class UserModule { }
