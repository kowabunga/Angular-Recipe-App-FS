import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  loggedIn: boolean;
  constructor(private user: UserService, private router: Router) {}

  ngOnInit(): void {
    this.user.loggedIn.subscribe((data) => (this.loggedIn = data));
    this.user.checkIfLoggedIn();
  }

  logOut(): void {
    this.user.logout();
    this.router.navigate(['/']);
  }
}
