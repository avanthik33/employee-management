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
    projectId: new FormControl(0),
    projectName: new FormControl(null, Validators.required),
    clientName: new FormControl(null, Validators.required),
    startDate: new FormControl(null, Validators.required),
    leadByEmpId: new FormControl(null, Validators.required),
    contactPerson: new FormControl(null, Validators.required),
    contactNo: new FormControl(null, Validators.required),
    emailId: new FormControl(null, Validators.required),
  });

  apiService: ApiService = inject(ApiService);
  employeesList = signal<IEmployee[]>([]);

  onSubmit() {
    const projectObj = new Project(
      this.formData.get('projectName')?.value,
      this.formData.get('clientName')?.value,
      this.formData.get('startDate')?.value,
      this.formData.get('leadByEmpId')?.value,
      this.formData.get('contactPerson')?.value,
      this.formData.get('contactNo')?.value,
      this.formData.get('emailId')?.value
    );
    this.apiService.CreateProject(projectObj);
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
