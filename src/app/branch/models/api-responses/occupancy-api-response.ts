import {OccupancyDto} from "../occupancy.dto";

export interface OccupancyApiResponse {
  occupancies: OccupancyDto[];
  occupancy: OccupancyDto;
}
