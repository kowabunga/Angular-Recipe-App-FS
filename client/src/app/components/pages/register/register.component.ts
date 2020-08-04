import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
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

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  onRegisterSubmit(): void {
    this.userService.register(this.name, this.email, this.password).subscribe(
      (data) => {
        localStorage.setItem('jwt', data.token);
        this.router.navigate(['/']);
        this.userService.changeLoginStatus(true);
      },
      (error) => {
        this.error = error.error.error;
      }
    );
  }
}
