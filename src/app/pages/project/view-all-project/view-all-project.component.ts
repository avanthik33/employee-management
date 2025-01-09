import { Component, inject, OnInit, signal } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { IProject } from '../../../interfaces';

@Component({
  selector: 'app-view-all-project',
  imports: [],
  templateUrl: './view-all-project.component.html',
  styleUrl: './view-all-project.component.css',
})
export class ViewAllProjectComponent implements OnInit {
  projectList = signal<IProject[]>([]);
  apiService: ApiService = inject(ApiService);
  fetchAllProjects() {
    this.apiService.GetAllProject().subscribe({
      next: (res: IProject[]) => {
        if (res.length > 0) {
          this.projectList.update(() => res);
        } else {
          console.log('error in fetching projects');
        }
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  updateProject(id: number) {}
  deleteProject(id: number) {}

  ngOnInit(): void {
    this.fetchAllProjects();
  }
}
