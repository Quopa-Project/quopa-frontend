import {BranchDto} from "../../admin/models/branch.dto";
import {TeamDto} from "./team.dto";

export interface TournamentDto {
  id: number;
  name: string;
  branch: BranchDto;

  branchId: number;
  userId: number;
  teams: TeamDto[];
}
