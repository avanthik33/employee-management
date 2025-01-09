import { Component } from '@angular/core';
import { EmployeeNavbarComponent } from '../../components/employee-navbar/employee-navbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-employee',
  imports: [EmployeeNavbarComponent, RouterOutlet],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css',
})
export class EmployeeComponent {}
