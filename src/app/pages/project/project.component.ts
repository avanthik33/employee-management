import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProjectNavbarComponent } from "../../components/project-navbar/project-navbar.component";

@Component({
  selector: 'app-project',
  imports: [RouterOutlet, ProjectNavbarComponent],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent {

}
