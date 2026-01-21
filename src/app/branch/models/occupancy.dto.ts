import {CourtDto} from "./court.dto";
import {OccupancyTypeDto} from "../../superadmin/models/occupancy-type.dto";

export interface OccupancyDto {
  id: number;
  title: string;
  startDate: Date;
  endDate: Date;
  startTime: string;
  endTime: string;
  days: number[];
  occupancyType: OccupancyTypeDto;
  court: CourtDto;

  startTimeDate: Date;
  endTimeDate: Date;
  occupancyTypeId: number;
  courtId: number;
  dayNames: string[];
}
