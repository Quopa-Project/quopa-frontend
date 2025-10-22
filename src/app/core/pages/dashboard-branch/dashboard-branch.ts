import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-dashboard-branch',
  standalone: false,
  templateUrl: './dashboard-branch.html',
  styleUrl: './dashboard-branch.css'
})
export class DashboardBranch {
  @Input() role: string = '';
}
