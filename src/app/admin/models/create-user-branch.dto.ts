import {UserDto} from "../../core/models/user.dto";
import {BranchDto} from "./branch.dto";

export interface CreateUserBranchDto {
  user: UserDto;
  branch: BranchDto;
}