import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  notSent: boolean = true;
  email: string;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.authService.requestResetPasswordLink(this.email).subscribe(
      (data) => {
        this.notSent = false;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
