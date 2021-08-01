import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from './core/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private dataService: DataService,
    private router: Router) { }

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
