import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserLogin } from '../../models/user';
import { DataService } from '../../core/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private dataService: DataService,
    private router: Router) { }

  ngOnInit() {
  }

  loginUser(formValues: any): void {
    let auth: UserLogin = <UserLogin>formValues;

    this.dataService.authUser(auth)
      .subscribe(
        (data: any) => {
          if (data) {
            this.dataService.authData = data;
          }

          this.router.navigate(['/dashboard']);
        },
        (err: any) => console.log(err)
      );
  }

}
