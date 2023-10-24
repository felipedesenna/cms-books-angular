import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from '../core/data.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private router: Router
  ) { }

  ngOnInit(): void {}

  get isLoggedIn(): boolean {
    return this.dataService.isLoggedIn;
  }

  get userName(): string {
    if (this.dataService.authData.users) {
      return this.dataService.authData.users.user;
    }
    return '';
  }

  logOut(): void {
    this.dataService.logout();
    this.router.navigateByUrl('/dashboard');
  }
}
