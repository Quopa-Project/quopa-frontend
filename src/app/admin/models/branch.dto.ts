import {CompanyDto} from "./company.dto";

export interface BranchDto {
  id: number;
  name: string;
  address: string;
  company: CompanyDto;

  companyId: number;
}
