import { ApiService } from './../../services/api.service';
import { Component, inject, signal } from '@angular/core';
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
  constructor() {}

  apiService: ApiService = inject(ApiService);
  formData: FormGroup = new FormGroup({
    userName: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, Validators.required),
  });

  isLoading = signal<boolean>(false);
  parentdepartments: any = [];

  handleLogin() {
    if (!this.formData.invalid) {
      this.isLoading.set(true);
      this.apiService.Login(this.formData.value, this.isLoading);
    } else {
      alert('null or invalid input!');
    }
  }
}
