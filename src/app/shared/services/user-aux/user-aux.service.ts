import { Injectable } from '@angular/core';
import {UserDto} from "../../../core/models/user.dto";

@Injectable({
  providedIn: 'root'
})
export class UserAuxService {
  private user: UserDto = {} as UserDto;

  setUser(user: UserDto) {
    this.user = user;
  }

  getUser(): UserDto {
    return this.user;
  }

  getUserRole(): string {
    return this.user.role;
  }
}
