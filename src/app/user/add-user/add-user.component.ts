import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../models/user';
import { DataService } from '../../core/data.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  constructor(private dataService: DataService,
    private router: Router) { }

  ngOnInit() {
  }

  saveUser(formValues: any): void {
    let newUser: User = <User>formValues;
    newUser.id = 0;

    this.dataService.addUser(newUser)
      .subscribe(
        (data: User) => this.router.navigate(['/login']),
        (err: any) => console.log(err)
      );
  }

}
