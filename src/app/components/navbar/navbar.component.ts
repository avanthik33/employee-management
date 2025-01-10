import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  router: Router = inject(Router);
  handleLogout() {
    localStorage.removeItem('loggedUser');
    this.router.navigateByUrl('/', { replaceUrl: true });
  }
}
