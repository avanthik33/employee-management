import { IApiResponse, IEmployee, IProject } from '../interfaces';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  CHILD_DEPARTMENT_BY_ID_API_URL,
  CREATE_EMPLOYEE_API_URL,
  CREATE_PROJECT_API_URL,
  DELETE_EMPLOYEE_API_URL,
  DELETE_PROJECT_API_URL,
  FETCH_ALL_EMPLOYEE_API_URL,
  FETCH_ALL_PROJECTS,
  LOGIN_API_URL,
  PARENT_DEPARTMENT_API_URL,
  UPDATE_EMPLOYEE_API_URL,
  UPDATE_PROJECT_API_URL,
} from '../apis';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  http = inject(HttpClient);
  router = inject(Router);

  constructor() {}

  Login(data: any, isLoading: { set: (value: boolean) => void }) {
    isLoading.set(true);
    this.http
      .post<IApiResponse>(LOGIN_API_URL, data)
      .pipe(
        catchError((err) => {
          return throwError(() => err);
        })
      )
      .subscribe({
        next: (res: IApiResponse) => {
          isLoading.set(false);
          console.log(res);
          if (res.result) {
            localStorage.setItem('loggedUser', JSON.stringify(res.data));
            this.router.navigateByUrl('/dashboard', { replaceUrl: true });
          } else {
            alert(res.message);
          }
        },
        error: (err) => {
          isLoading.set(false);
          console.error(err.message);
          alert('Login error,please try again later');
        },
      });
  }

  GetAllParentDepartments(): Observable<IApiResponse> {
    return this.http.get<IApiResponse>(PARENT_DEPARTMENT_API_URL).pipe(
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }

  GetChildDepById(id: number): Observable<IApiResponse> {
    return this.http
      .get<IApiResponse>(CHILD_DEPARTMENT_BY_ID_API_URL + id)
      .pipe(
        catchError((err) => {
          return throwError(() => err);
        })
      );
  }

  CreateEmployee(
    employee: Partial<IEmployee>,
    isLoading: { set: (value: boolean) => void }
  ) {
    isLoading.set(true);
    this.http
      .post<IApiResponse>(CREATE_EMPLOYEE_API_URL, employee)
      .pipe(
        catchError((err) => {
          return throwError(() => err);
        })
      )
      .subscribe({
        next: (res: IApiResponse) => {
          isLoading.set(false);
          if (res) {
            alert('successfully created');
          }
        },
        error: (err) => {
          isLoading.set(false);
          console.error(err);
          alert(err.statusText);
        },
      });
  }

  GetAllEmployees(): Observable<IEmployee[]> {
    return this.http.get<IEmployee[]>(FETCH_ALL_EMPLOYEE_API_URL).pipe(
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }

  CreateProject(
    project: Partial<IProject>,
    isLoading: { set: (value: boolean) => void }
  ) {
    isLoading.set(true);
    this.http
      .post(CREATE_PROJECT_API_URL, project)
      .pipe(
        catchError((err) => {
          console.error('Error occurred:', err);
          return throwError(() => err);
        })
      )
      .subscribe({
        next: (res) => {
          isLoading.set(false);
          if (res) {
            alert('Created Successfully');
          }
        },
        error: (err) => {
          isLoading.set(false);
          console.error('Subscription error:', err);
          alert(err.statusText);
        },
      });
  }

  GetAllProject(): Observable<IProject[]> {
    console.log('getAllprojects called');
    return this.http.get<IProject[]>(FETCH_ALL_PROJECTS).pipe(
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }

  UpdateProject(id: number, body: Partial<IProject>) {
    this.http
      .put(UPDATE_PROJECT_API_URL + id, body)
      .pipe(
        catchError((err) => {
          return throwError(() => err);
        })
      )
      .subscribe({
        next: (res) => {
          alert('Project updation request submitted');
          console.log(res);
        },
        error: (err) => {
          alert('Somthing error occured, please try again later');
          console.log(err);
        },
      });
  }

  UpdateEmployee(id: number, body: Partial<IEmployee>) {
    this.http
      .put(UPDATE_EMPLOYEE_API_URL + id, body)
      .pipe(
        catchError((err) => {
          return throwError(() => err);
        })
      )
      .subscribe({
        next: (res) => {
          alert('Employee updation request submitted');
          console.log(res);
        },
        error: (err) => {
          alert('Somthing error occured, please try again later');
          console.log(err);
        },
      });
  }

  DeleteProject(id: number) {
    this.http
      .delete(DELETE_PROJECT_API_URL + id)
      .pipe(
        catchError((err) => {
          return throwError(() => err);
        })
      )
      .subscribe({
        next: (res) => {
          console.log(res);
          alert(res);
        },
        error: (err) => {
          console.log(err);
          alert('Somthing error occured, Please try again later');
        },
      });
  }

  DeleteEmployee(id: number) {
    this.http
      .delete(DELETE_EMPLOYEE_API_URL + id)
      .pipe(
        catchError((err) => {
          return throwError(() => err);
        })
      )
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          alert('somthing error occured, Please try again later');
          console.log(err);
        },
      });
  }
}
