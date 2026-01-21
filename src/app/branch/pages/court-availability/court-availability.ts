import {Component, Input, OnInit} from '@angular/core';
import {CourtDto} from "../../models/court.dto";
import {UserAuxService} from "../../../shared/services/user-aux/user-aux.service";
import {firstValueFrom} from "rxjs";
import {ErrorSnackBar} from "../../../shared/pages/error-snack-bar/error-snack-bar";
import {MatSnackBar} from "@angular/material/snack-bar";
import {OccupancyService} from "../../services/occupancy/occupancy-service";
import {OccupancyDto} from "../../models/occupancy.dto";
import {OccupancyTypeService} from "../../../superadmin/services/occupancy-type/occupancy-type.service";
import {ErrorMessage} from "../../../shared/models/error-message";
import {OccupancyTypeDto} from "../../../superadmin/models/occupancy-type.dto";

@Component({
  selector: 'app-court-availability',
  standalone: false,
  templateUrl: './court-availability.html',
  styleUrl: './court-availability.css'
})
export class CourtAvailability implements OnInit {
  @Input() injected: boolean = false;

  dataLoaded: number = 0;

  savingOccupancy: boolean = false;

  court: CourtDto;

  occupancyToSave: OccupancyDto;

  occupancyTypes: OccupancyTypeDto[];
  occupancies: OccupancyDto[];

  dayMap: { [key: number]: string } = {
    0: 'D', 1: 'L', 2: 'M', 3: 'X', 4: 'J', 5: 'V', 6: 'S'
  };

  displayedColumns: string[] = ['icon', 'title', 'days'];

  constructor(private occupancyService: OccupancyService, private occupancyTypeService: OccupancyTypeService,
              private userAuxService: UserAuxService, private snackBar: MatSnackBar,) {
    this.court = this.userAuxService.getCourt();
    this.occupancyToSave = { courtId: this.court.id } as OccupancyDto;
    this.occupancyTypes = [];
    this.occupancies = [];
  }

  async ngOnInit(): Promise<void> {
    try {
      const occupancyTypeApiResponse = await firstValueFrom(this.occupancyTypeService.getAll());
      this.occupancyTypes = occupancyTypeApiResponse.occupancyTypes;

      const occupancyApiResponse = await firstValueFrom(this.occupancyService.getByCourtIdAndActive(this.court.id));
      this.occupancies = occupancyApiResponse.occupancies.map((occ: OccupancyDto) => {
        occ.dayNames = occ.days ? occ.days.map((dayNum: number) => this.dayMap[dayNum]) : [];
        return occ;
      });

      this.dataLoaded = 1;
    } catch (error: any) {
      this.dataLoaded = -1;
      this.snackBar.openFromComponent(ErrorSnackBar, {
        data: {
          messages: error.message
        },
        duration: 2000
      });
    }
  }

  refreshOccupancies() {
    this.dataLoaded = 0;
    this.occupancyService.getByCourtIdAndActive(this.court.id).subscribe({
      next: (response) => {
        this.dataLoaded = 1;
        this.occupancies = response.occupancies.map((occ: OccupancyDto) => {
          occ.dayNames = occ.days ? occ.days.map((dayNum: number) => this.dayMap[dayNum]) : [];
          return occ;
        });
      },
      error: (error: ErrorMessage) => {
        this.dataLoaded = -1;
        this.snackBar.openFromComponent(ErrorSnackBar, {
          data: {
            messages: error.message
          },
          duration: 2000
        });
      }
    });
  }

  cleanOccupancy() {
    this.occupancyToSave = { courtId: this.court.id } as OccupancyDto;
  }

  onSaveOccupancy() {
    this.savingOccupancy = true;
    this.occupancyToSave.startTime = this.occupancyToSave.startTimeDate.getHours().toString() + ':' + this.occupancyToSave.startTimeDate.getMinutes().toString();
    this.occupancyToSave.endTime = this.occupancyToSave.endTimeDate.getHours().toString() + ':' + this.occupancyToSave.endTimeDate.getMinutes().toString();
    this.snackBar.open('Creando ocupación');
    this.occupancyService.create(this.occupancyToSave).subscribe({
      next: () => {
        this.savingOccupancy = false;
        this.snackBar.dismiss();
        this.refreshOccupancies();
      },
      error: (error: ErrorMessage) => {
        this.savingOccupancy = false;
        this.snackBar.openFromComponent(ErrorSnackBar, {
          data: {
            messages: error.message
          },
          duration: 2000
        });
      }
    });
  }
}
