import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
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
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  // Call api to log in user, handle success and rejection
  onLoginSubmit() {
    this.authService.login(this.email, this.password).subscribe(
      (data) => {
        localStorage.setItem('jwt', data.token);
        this.router.navigate(['/']);
        this.authService.changeLoginStatus(true);
      },
      (error) => {
        if (
          error.statusText === 'Unauthorized' ||
          error.statusText === 'Bad Request'
        ) {
          this.error = error.error.error;
          setTimeout(() => {
            this.error = null;
          }, 5000);
        }
      }
    );
  }
}
