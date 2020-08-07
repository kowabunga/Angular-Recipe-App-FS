import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  user: User;
  edit: boolean = false;
  oldPassword: string;
  newPassword: string;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUser().subscribe((data) => (this.user = data));
  }

  onSubmit(): void {
    let updatedUser = {
      name: this.user.name,
      email: this.user.email,
      oldPassword: this.oldPassword,
      newPassword: this.newPassword,
    };
  }
}
