import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  error: string;
  constructor(private user: UserService, private router: Router) {}

  ngOnInit(): void {}

  // Call api to log in user, handle success and rejection
  onLoginSubmit() {
    this.user.login(this.email, this.password).subscribe(
      (data) => {
        localStorage.setItem('jwt', data.token);
        this.router.navigate(['/']);
        this.user.changeLoginStatus(true);
      },
      (error) => {
        if (error.statusText === 'Unauthorized') {
          this.error = error.error.error;
          setTimeout(() => {
            this.error = null;
          }, 5000);
        }
      }
    );
  }
}
