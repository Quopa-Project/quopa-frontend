import {Component, Input, OnInit} from '@angular/core';
import {RatingService} from "../../../client/service/rating/rating.service";
import {UserAuxService} from "../../../shared/services/user-aux/user-aux.service";
import {BranchDto} from "../../../admin/models/branch.dto";
import {ErrorMessage} from "../../../shared/models/error-message";
import {ErrorSnackBar} from "../../../shared/pages/error-snack-bar/error-snack-bar";
import {MatSnackBar} from "@angular/material/snack-bar";
import {RatingDto} from "../../../client/models/rating.dto";

@Component({
  selector: 'app-see-ratings',
  standalone: false,
  templateUrl: './see-ratings.html',
  styleUrl: './see-ratings.css'
})
export class SeeRatings implements OnInit {
  @Input() injected: boolean = false;

  dataLoaded: number = 0;

  branch: BranchDto;

  ratings: RatingDto[];

  constructor(private ratingService: RatingService, private userAuxService: UserAuxService,
              private snackBar: MatSnackBar) {
    this.branch = this.userAuxService.getBranch();
    this.ratings = [];
  }

  ngOnInit() {
    if (this.injected) {
      this.branch = this.userAuxService.getBranchDetail();
    }
    this.dataLoaded = 0;
    this.ratingService.getByBranchId(this.branch.id).subscribe({
      next: (response) => {
        this.dataLoaded = 1;
        this.ratings = response.ratings;
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
}
