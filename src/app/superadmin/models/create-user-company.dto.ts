import {UserDto} from "../../core/models/user.dto";
import {CompanyDto} from "../../admin/models/company.dto";

export interface CreateUserCompanyDto {
  user: UserDto;
  company: CompanyDto;
}