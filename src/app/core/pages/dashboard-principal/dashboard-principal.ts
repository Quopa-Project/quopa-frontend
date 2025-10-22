import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-dashboard-principal',
  standalone: false,
  templateUrl: './dashboard-principal.html',
  styleUrl: './dashboard-principal.css'
})
export class DashboardPrincipal {
  role: string;

  constructor(private route: ActivatedRoute) {
    this.role = this.route.parent?.snapshot.params['role'];
  }
}
