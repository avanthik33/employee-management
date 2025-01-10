import { Component, inject, OnInit, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Project } from '../../../models/Project';
import { ApiService } from '../../../services/api.service';
import { IEmployee } from '../../../interfaces';

@Component({
  selector: 'app-add-project',
  imports: [ReactiveFormsModule],
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.css',
})
export class AddProjectComponent implements OnInit {
  formData: FormGroup = new FormGroup({
    projectName: new FormControl(null, Validators.required),
    clientName: new FormControl(null, Validators.required),
    startDate: new FormControl(null, Validators.required),
    leadByEmpId: new FormControl(null, Validators.required),
    contactPerson: new FormControl(null, Validators.required),
    contactNo: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^\d{10}$/),
    ]),
    emailId: new FormControl(null, [Validators.required, Validators.email]),
  });

  apiService: ApiService = inject(ApiService);
  employeesList = signal<IEmployee[]>([]);
  isLoading = signal<boolean>(false);

  onSubmit() {
    const projectObj = new Project({
      projectName: this.formData.get('projectName')?.value,
      clientName: this.formData.get('clientName')?.value,
      startDate: this.formData.get('startDate')?.value,
      leadByEmpId: this.formData.get('leadByEmpId')?.value,
      contactPerson: this.formData.get('contactPerson')?.value,
      contactNo: this.formData.get('contactNo')?.value,
      emailId: this.formData.get('emailId')?.value,
    });
    console.log(projectObj);
    this.apiService.CreateProject(projectObj, this.isLoading);
    this.formData.reset();
  }

  fetchAllEmployee() {
    this.apiService.GetAllEmployees().subscribe({
      next: (res: IEmployee[]) => {
        this.employeesList.update(() => res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnInit(): void {
    this.fetchAllEmployee();
  }
}
