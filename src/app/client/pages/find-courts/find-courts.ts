import {Component, OnInit} from '@angular/core';
import {SportDto} from "../../../branch/models/sport.dto";
import {SportService} from "../../../branch/services/sport/sport.service";
import {ErrorSnackBar} from "../../../shared/pages/error-snack-bar/error-snack-bar";
import {MatSnackBar} from "@angular/material/snack-bar";
import {firstValueFrom} from "rxjs";
import {CourtDto} from "../../../branch/models/court.dto";
import {CourtService} from "../../../branch/services/court/court.service";

@Component({
  selector: 'app-find-courts',
  standalone: false,
  templateUrl: './find-courts.html',
  styleUrl: './find-courts.css'
})
export class FindCourts implements OnInit {
  dataLoaded: number = 0;
  loading: boolean = false;

  sportIdSelected: number;

  sports: SportDto[] = [];
  courts: CourtDto[] = [];

  constructor(private sportService: SportService, private courtService: CourtService,
              private snackBar: MatSnackBar) {
    this.sportIdSelected = 0;
  }

  async ngOnInit(): Promise<void> {
    try {
      const sportApiResponse =  await firstValueFrom(this.sportService.getAll());
      this.sports = sportApiResponse.sports;

      const courtApiResponse =  await firstValueFrom(this.courtService.getAll());
      this.courts = courtApiResponse.courts;

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
}
