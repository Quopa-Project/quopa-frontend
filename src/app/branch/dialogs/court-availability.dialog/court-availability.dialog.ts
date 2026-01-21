import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {CourtDto} from "../../models/court.dto";

type ManageCourtAvailability = {
  court: CourtDto;
};

@Component({
  selector: 'app-court-availability.dialog',
  standalone: false,
  templateUrl: './court-availability.dialog.html',
  styleUrl: './court-availability.dialog.css'
})
export class CourtAvailabilityDialog {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ManageCourtAvailability
  ) { }
}
