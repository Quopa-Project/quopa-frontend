import {OccupancyTypeDto} from "../occupancy-type.dto";

export interface OccupancyTypeApiResponse {
  occupancyType: OccupancyTypeDto;
  occupancyTypes: OccupancyTypeDto[];
}
