import {BranchDto} from "../../admin/models/branch.dto";
import {SportDto} from "./sport.dto";

export interface CourtDto {
  id: number;
  description: string;
  capacity: number;
  price: number;
  branch: BranchDto;
  sport: SportDto;

  branchId: number;
  sportId: number;
}
