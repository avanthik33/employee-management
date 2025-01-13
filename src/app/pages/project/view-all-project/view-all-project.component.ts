import {
  Component,
  ElementRef,
  inject,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { IEmployee, IProject } from '../../../interfaces';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-all-project',
  imports: [DatePipe, FormsModule],
  templateUrl: './view-all-project.component.html',
  styleUrl: './view-all-project.component.css',
})
export class ViewAllProjectComponent implements OnInit {
  hasUnsavedChanges = false;

  projectList = signal<IProject[]>([]);
  employeeList = signal<IEmployee[]>([]);
  isLoading = signal<boolean>(false);
  apiService: ApiService = inject(ApiService);

  fetchAllProjects() {
    this.isLoading.set(true);
    this.apiService.GetAllProject().subscribe({
      next: (res: IProject[]) => {
        this.isLoading.set(false);
        if (res.length > 0) {
          this.projectList.update(() => res);
        } else {
          console.log('error in fetching projects');
        }
      },
      error: (err) => {
        this.isLoading.set(false);
        console.error(err);
      },
    });
  }

  fetchAllEmployees() {
    this.apiService.GetAllEmployees().subscribe({
      next: (res: IEmployee[]) => {
        this.employeeList.update(() => res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getEmpNameById(empId: number) {
    const emp = this.employeeList().find((emp) => emp.employeeId === empId);
    return emp ? emp.employeeName : empId;
  }

  formData: IProject = {
    projectId: 0,
    projectName: '',
    clientName: '',
    startDate: new Date(),
    leadByEmpId: 0,
    contactPerson: '',
    emailId: '',
    contactNo: '',
  };

  @ViewChild('updateModel') updateModel!: ElementRef;

  handleUpdateProject(project: IProject) {
    if (this.updateModel && this.updateModel.nativeElement) {
      this.updateModel.nativeElement.style.display = 'block';
      this.hasUnsavedChanges = true;
    }

    const PrevFormData: IProject = {
      projectId: project.projectId,
      projectName: project.projectName,
      clientName: project.clientName,
      startDate: project.startDate,
      leadByEmpId: project.leadByEmpId,
      contactPerson: project.contactPerson,
      emailId: project.emailId,
      contactNo: project.contactNo,
    };
    this.formData = PrevFormData;
  }

  updateProject() {
    this.apiService.UpdateProject(this.formData.projectId, this.formData);
    if (this.updateModel && this.updateModel.nativeElement) {
      this.updateModel.nativeElement.style.display = 'none';
      this.hasUnsavedChanges = false;
    }

    setTimeout(() => {
      this.fetchAllProjects();
    }, 1000);
  }

  closeModal() {
    if (this.updateModel && this.updateModel.nativeElement) {
      this.updateModel.nativeElement.style.display = 'none';
      this.hasUnsavedChanges = false;
    }
  }

  handleDeleteProject(id: number) {
    this.apiService.DeleteProject(id);
    setTimeout(() => {
      this.fetchAllProjects();
    }, 1000);
  }

  ngOnInit(): void {
    this.fetchAllProjects();
    this.fetchAllEmployees();
  }
}
