import { IApiResponse, IEmployee, IProject } from '../interfaces';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  CHILD_DEPARTMENT_BY_ID_API_URL,
  CREATE_EMPLOYEE,
  CREATE_PROJECT_API_URL,
  FETCH_ALL_EMPLOYEE_API_URL,
  FETCH_ALL_PROJECTS,
  LOGIN_API_URL,
  PARENT_DEPARTMENT_API_URL,
} from '../apis';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  http = inject(HttpClient);
  router = inject(Router);

  constructor() {}

  Login(data: any) {
    this.http.post<IApiResponse>(LOGIN_API_URL, data).subscribe({
      next: (res: IApiResponse) => {
        if (res.result) {
          this.router.navigateByUrl('/dashboard', { replaceUrl: true });
        } else {
          alert(res.message);
        }
      },
      error: (err) => {
        console.error(err.message);
        alert('Login error,please try again later');
      },
    });
  }

  GetAllParentDepartments(): Observable<IApiResponse> {
    return this.http.get<IApiResponse>(PARENT_DEPARTMENT_API_URL);
  }

  GetChildDepById(id: number): Observable<IApiResponse> {
    return this.http.get<IApiResponse>(CHILD_DEPARTMENT_BY_ID_API_URL + id);
  }

  CreateEmployee(employee: Partial<IEmployee>) {
    this.http.post<IApiResponse>(CREATE_EMPLOYEE, employee).subscribe({
      next: (res: IApiResponse) => {
        alert(res.message);
      },
      error: (err) => {
        console.error(err.message);
        alert('somthing error,please try again later');
      },
    });
  }

  GetAllEmployees(): Observable<IEmployee[]> {
    return this.http.get<IEmployee[]>(FETCH_ALL_EMPLOYEE_API_URL);
  }

  CreateProject(project: Partial<IProject>) {
    this.http.post<IApiResponse>(CREATE_PROJECT_API_URL, project).subscribe({
      next: (res: IApiResponse) => {
        if (res.result) {
        } else {
          console.error(res.message);
        }
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  GetAllProject(): Observable<IProject[]> {
    return this.http.get<IProject[]>(FETCH_ALL_PROJECTS);
  }
}
