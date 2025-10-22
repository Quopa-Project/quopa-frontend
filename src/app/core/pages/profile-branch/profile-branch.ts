import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-profile-branch',
  standalone: false,
  templateUrl: './profile-branch.html',
  styleUrl: './profile-branch.css'
})
export class ProfileBranch {
  @Input() role: string = '';
}
