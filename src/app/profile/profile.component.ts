import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { UserInfo } from '../model/user-info';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: UserInfo | null = null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    console.log('Fetching user info');
    this.authService.getUserInfo().subscribe(
      (userInfo: UserInfo | null) => {
        this.user = userInfo;
        console.log('User info:', this.user);
      },
      (error: any) => {
        console.error('Error fetching user info:', error);
      }
    );
  }
}