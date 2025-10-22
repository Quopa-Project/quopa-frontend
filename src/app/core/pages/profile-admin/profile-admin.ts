import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-profile-admin',
  standalone: false,
  templateUrl: './profile-admin.html',
  styleUrl: './profile-admin.css'
})
export class ProfileAdmin {
  @Input() role: string = '';
}
