import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-profile-principal',
  standalone: false,
  templateUrl: './profile-principal.html',
  styleUrl: './profile-principal.css'
})
export class ProfilePrincipal {
  role: string;

  constructor(private route: ActivatedRoute) {
    this.role = this.route.parent?.snapshot.params['role'];
  }
}
