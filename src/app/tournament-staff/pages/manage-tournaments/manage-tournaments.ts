import {Component, OnInit} from '@angular/core';
import {TournamentDto} from "../../../superadmin/models/tournament.dto";
import {TournamentService} from "../../../superadmin/services/tournament/tournament.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ErrorMessage} from "../../../shared/models/error-message";
import {ErrorSnackBar} from "../../../shared/pages/error-snack-bar/error-snack-bar";
import {UserAuxService} from "../../../shared/services/user-aux/user-aux.service";

@Component({
  selector: 'app-manage-tournaments',
  standalone: false,
  templateUrl: './manage-tournaments.html',
  styleUrl: './manage-tournaments.css'
})
export class ManageTournaments implements OnInit {
  dataLoaded: number = 0;

  tournaments: TournamentDto[];

  userId: number;

  displayedColumns: string[] = ['name', 'branch', 'actions'];

  constructor(private tournamentService: TournamentService, private userAuxService: UserAuxService,
              private snackBar: MatSnackBar,) {
    this.userId = this.userAuxService.getUser().id;
    this.tournaments = [];
  }

  ngOnInit(): void {
    this.refreshTournaments();
  }

  refreshTournaments() {
    this.tournamentService.getByUserId(this.userId).subscribe({
      next: (response) => {
        this.dataLoaded = 1;
        this.tournaments = response.tournaments;
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
