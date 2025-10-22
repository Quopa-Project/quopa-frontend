import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home-branch',
  standalone: false,
  templateUrl: './home-branch.html',
  styleUrl: './home-branch.css'
})
export class HomeBranch {
  @Input() role: string = '';

  constructor(private router: Router) {}

  signOut() {
    localStorage.clear();
    this.router.navigate(['/login']).then();
  }
}
