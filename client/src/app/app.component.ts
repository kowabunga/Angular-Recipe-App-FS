import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  loggedIn: boolean;
  active: boolean = false;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.loggedIn.subscribe((data) => (this.loggedIn = data));
    this.authService.checkIfLoggedIn();
  }

  logOut(): void {
    this.authService.logout();
    this.active = false;
    this.router.navigate(['/']);
  }
}
