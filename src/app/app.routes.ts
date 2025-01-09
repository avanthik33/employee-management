import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EmployeeComponent } from './pages/employee/employee.component';
import { AddEmployeeComponent } from './pages/employee/add-employee/add-employee.component';
import { ViewAllEmployeesComponent } from './pages/employee/view-all-employees/view-all-employees.component';
import { ProjectComponent } from './pages/project/project.component';
import { AddProjectComponent } from './pages/project/add-project/add-project.component';
import { ViewAllProjectComponent } from './pages/project/view-all-project/view-all-project.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    title: 'login page',
    component: LoginComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        title: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'employee',
        title: 'employee',
        component: EmployeeComponent,
        children: [
          {
            path: '',
            title: 'ViewAllemployee',
            component: ViewAllEmployeesComponent,
          },
          {
            path: 'addEmployee',
            title: 'AddEmployee',
            component: AddEmployeeComponent,
          },
        ],
      },
      {
        path: 'project',
        title: 'project',
        component: ProjectComponent,
        children: [
          {
            path: '',
            title: 'viewProjects',
            component: ViewAllProjectComponent,
          },
          {
            path: 'addProject',
            title: 'addProject',
            component: AddProjectComponent,
          },
        ],
      },
    ],
  },
];
