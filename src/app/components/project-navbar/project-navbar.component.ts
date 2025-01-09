import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-project-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './project-navbar.component.html',
  styleUrl: './project-navbar.component.css',
})
export class ProjectNavbarComponent {}
