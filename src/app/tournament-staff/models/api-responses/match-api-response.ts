import {MatchDto} from "../match.dto";
import {TableItemDto} from "../table-item.dto";

export interface MatchApiResponse {
  matches: MatchDto[];
  match: MatchDto;

  table: TableItemDto[];
}
