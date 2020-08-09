import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  password: string;
  token: string;
  notReset: boolean = true;
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data) => (this.token = data.token));
  }

  onSubmit(): void {
    this.authService.resetPassword(this.password, this.token).subscribe(
      (data) => {
        localStorage.setItem('jwt', data.token);
        this.authService.checkIfLoggedIn();
        this.router.navigate(['/']);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
