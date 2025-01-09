import { ApiService } from './../../services/api.service';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  apiService: ApiService = inject(ApiService);
  formData: FormGroup = new FormGroup({
    userName: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, Validators.required),
  });

  parentdepartments: any = [];
  handleLogin() {
    if (!this.formData.invalid) {
      this.apiService.Login(this.formData.value);
    } else {
      alert('null or invalid input!');
    }
  }
}
