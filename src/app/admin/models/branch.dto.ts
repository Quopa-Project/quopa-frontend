import {CompanyDto} from "./company.dto";
import {UserDto} from "../../core/models/user.dto";

export interface BranchDto {
  id: number;
  name: string;
  address: string;
  company: CompanyDto;
  user: UserDto;

  companyId: number;
}
