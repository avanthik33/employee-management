import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { IApiResponse, IChildDep, IParentDep } from '../../../interfaces';
import { Employee } from '../../../models/Employee';

@Component({
  selector: 'app-add-employee',
  imports: [ReactiveFormsModule],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css',
})
export class AddEmployeeComponent implements OnInit {
  formData: FormGroup = new FormGroup({
    employeeName: new FormControl(null, Validators.required),
    contactNo: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^\d{10}$/),
    ]),
    emailId: new FormControl(null, [Validators.required, Validators.email]),
    deptId: new FormControl(null),
    childDep: new FormControl(
      { value: null, disabled: true },
      Validators.required
    ),
    gender: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  });

  apiServices: ApiService = inject(ApiService);
  parentDepartmentList: IParentDep[] = [];
  childDepartmentList: IChildDep[] = [];

  handleGetParentDep() {
    this.apiServices.GetAllParentDepartments().subscribe({
      next: (res: IApiResponse) => {
        this.parentDepartmentList = res.data;
        console.log(this.parentDepartmentList);
      },
      error: (err) => {
        console.log(err.message);
        alert('Parent department fetch Error');
      },
    });
  }

  handleGetSubDepartment() {
    this.apiServices
      .GetChildDepById(this.formData.get('deptId')?.value)
      .subscribe({
        next: (res: IApiResponse) => {
          this.childDepartmentList = res.data;
          console.log(this.childDepartmentList);
        },
        error: (err) => {
          console.log(err.message);
        },
      });
  }

  handleSubmit() {
    const employeeObj = new Employee({
      employeeName: this.formData.get('employeeName')?.value,
      contactNo: this.formData.get('contactNo')?.value,
      emailId: this.formData.get('emailId')?.value,
      deptId: this.formData.get('chilDep')?.value,
      password: this.formData.get('password')?.value,
      gender: this.formData.get('gender')?.value,
    });
    this.apiServices.CreateEmployee(employeeObj);
    this.formData.reset();
  }

  ngOnInit(): void {
    this.formData.get('deptId')?.valueChanges.subscribe((value) => {
      if (value) {
        this.formData.get('childDep')?.enable();
      } else {
        this.formData.get('childDep')?.disable();
      }
    });
    this.handleGetParentDep();
  }
}
