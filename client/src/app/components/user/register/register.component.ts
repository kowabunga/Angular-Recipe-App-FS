import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  email: string;
  password: string;
  name: string;
  error: string;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onRegisterSubmit(): void {
    this.authService.register(this.name, this.email, this.password).subscribe(
      (data) => {
        localStorage.setItem('jwt', data.token);
        this.router.navigate(['/']);
        this.authService.changeLoginStatus(true);
      },
      (error) => {
        this.error = error.error.error;
      }
    );
  }
}
