import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-dashboard-superadmin',
  standalone: false,
  templateUrl: './dashboard-superadmin.html',
  styleUrl: './dashboard-superadmin.css'
})
export class DashboardSuperadmin {
  @Input() role: string = '';
}
