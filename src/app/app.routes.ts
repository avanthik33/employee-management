import { Routes, CanActivateFn } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EmployeeComponent } from './pages/employee/employee.component';
import { AddEmployeeComponent } from './pages/employee/add-employee/add-employee.component';
import { ViewAllEmployeesComponent } from './pages/employee/view-all-employees/view-all-employees.component';
import { ProjectComponent } from './pages/project/project.component';
import { AddProjectComponent } from './pages/project/add-project/add-project.component';
import { ViewAllProjectComponent } from './pages/project/view-all-project/view-all-project.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { authGuardGuard } from './guards/auth-guard.guard';
import { redirectIfLoggedGuard } from './guards/redirect-if-logged.guard';

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
    canActivate: [redirectIfLoggedGuard],
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuardGuard],
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
            canDeactivate: [
              (component: ViewAllProjectComponent) => {
                if (component.hasUnsavedChanges) {
                  return confirm(
                    'You have unsaved changes. Do you really want to leave?'
                  );
                }
                return true;
              },
            ],
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
            canDeactivate: [
              (component: ViewAllProjectComponent) => {
                if (component.hasUnsavedChanges) {
                  return confirm(
                    'You have unsaved changes. Do you really want to leave?'
                  );
                }
                return true;
              },
            ],
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
  {
    path: '**',
    title: 'not found',
    component: NotFoundComponent,
  },
];
