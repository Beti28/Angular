import { Component } from '@angular/core';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  birth: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private auth: AuthService) {}

  register() {
    if (this.name == '') {
      alert('Please enter name');
      return;
    }
    if (this.email == '') {
      alert('Please enter email');
      return;
    }
    if (this.birth == '') {
      alert('Please enter birth');
      return;
    }
    if (this.password == '') {
      alert('Please enter password');
      return;
    }
    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    this.auth.register(this.email, this.password, this.name, this.birth);
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
    this.name = '';
    this.birth = '';
  }
}
