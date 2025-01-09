import { Component, inject } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { IApiResponse, IEmployee } from '../../../interfaces';

@Component({
  selector: 'app-view-all-employees',
  imports: [],
  templateUrl: './view-all-employees.component.html',
  styleUrl: './view-all-employees.component.css',
})
export class ViewAllEmployeesComponent {
  apiService: ApiService = inject(ApiService);
  employeesList: IEmployee[] = [];

  fetchAllEmployees() {
    this.apiService.GetAllEmployees().subscribe({
      next: (res: IEmployee[]) => {
        if (res.length > 0) {
          this.employeesList = res;
        } else {
          console.log('hello mistake');
        }
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  updateEmployee(id: number) {}
  deleteEmployee(id: number) {}

  ngOnInit(): void {
    console.log('view all employees');
    this.fetchAllEmployees();
  }
}
