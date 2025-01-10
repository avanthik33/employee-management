import {
  Component,
  ElementRef,
  inject,
  signal,
  ViewChild,
} from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { IEmployee } from '../../../interfaces';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-all-employees',
  imports: [FormsModule],
  templateUrl: './view-all-employees.component.html',
  styleUrl: './view-all-employees.component.css',
})
export class ViewAllEmployeesComponent {
  hasUnsavedChanges: boolean = false;
  apiService: ApiService = inject(ApiService);
  employeesList: IEmployee[] = [];
  isLoading = signal<boolean>(false);
  @ViewChild('updateModel') updateModel!: ElementRef;

  formData: Partial<IEmployee> = {
    employeeId: 0,
    employeeName: '',
    contactNo: '',
    emailId: '',
    deptId: 0,
    password: '',
    gender: '',
  };

  fetchAllEmployees() {
    this.isLoading.set(true);
    this.apiService.GetAllEmployees().subscribe({
      next: (res: IEmployee[]) => {
        this.isLoading.set(false);
        if (res.length > 0) {
          this.employeesList = res;
        }
      },
      error: (err) => {
        this.isLoading.set(false);
        console.error(err);
      },
    });
  }

  handleUpdateEmployee(employee: IEmployee) {
    if (this.updateModel && this.updateModel.nativeElement) {
      this.updateModel.nativeElement.style.display = 'block';
      this.hasUnsavedChanges = true;
    }
    const PrevFormData: Partial<IEmployee> = {
      employeeId: employee.employeeId,
      employeeName: employee.employeeName,
      contactNo: employee.contactNo,
      emailId: employee.emailId,
      deptId: employee.deptId,
      password: employee.password,
      gender: employee.gender,
    };
    this.formData = PrevFormData;
  }

  updateEmployee() {
    this.apiService.UpdateEmployee(this.formData.employeeId!, this.formData);
    if (this.updateModel && this.updateModel.nativeElement) {
      this.updateModel.nativeElement.style.display = 'none';
      this.hasUnsavedChanges = false;
    }
    setTimeout(() => {
      this.fetchAllEmployees();
    }, 1000);
  }

  closeModal() {
    if (this.updateModel && this.updateModel.nativeElement) {
      this.updateModel.nativeElement.style.display = 'none';
      this.hasUnsavedChanges = false;
    }
  }
  deleteEmployee(id: number) {
    this.apiService.DeleteEmployee(id);
    setTimeout(() => {
      this.fetchAllEmployees();
    }, 1000);
  }

  ngOnInit(): void {
    this.fetchAllEmployees();
  }
}
