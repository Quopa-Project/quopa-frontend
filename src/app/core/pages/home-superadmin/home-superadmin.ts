import {Component, Input} from '@angular/core';
import {UserDto} from "../../models/user.dto";
import {Router} from "@angular/router";
import {UserAuxService} from "../../../shared/services/user-aux/user-aux.service";

@Component({
  selector: 'app-home-superadmin',
  standalone: false,
  templateUrl: './home-superadmin.html',
  styleUrl: './home-superadmin.css'
})
export class HomeSuperadmin {
  @Input() role: string = '';

  user: UserDto;

  constructor(private router: Router, public userService: UserAuxService) {
    this.user = this.userService.getUser();
  }

  signOut() {
    localStorage.clear();
    this.router.navigate(['login']).then();
  }
}
