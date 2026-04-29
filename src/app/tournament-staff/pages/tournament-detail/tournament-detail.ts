import {Component, OnInit} from '@angular/core';
import {TournamentDto} from "../../../superadmin/models/tournament.dto";
import {UserAuxService} from "../../../shared/services/user-aux/user-aux.service";
import {ErrorMessage} from "../../../shared/models/error-message";
import {ErrorSnackBar} from "../../../shared/pages/error-snack-bar/error-snack-bar";
import {MatchService} from "../../services/match/match.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TableItemDto} from "../../models/table-item.dto";
import {MatchDto} from "../../models/match.dto";
import {CourtDto} from "../../../branch/models/court.dto";
import {TeamDto} from "../../../superadmin/models/team.dto";
import {TeamService} from "../../../superadmin/services/team/team.service";
import {CourtService} from "../../../branch/services/court/court.service";

@Component({
  selector: 'app-tournament-detail',
  standalone: false,
  templateUrl: './tournament-detail.html',
  styleUrl: './tournament-detail.css'
})
export class TournamentDetail implements OnInit {
  dataLoaded: number = 0;
  savingMatch: boolean = false;

  tournament: TournamentDto;

  table: TableItemDto[];
  matches: MatchDto[];
  courts: CourtDto[];
  teams: TeamDto[];

  match: MatchDto;

  displayedColumns: string[] = ['team', 'played', 'wins', 'draws', 'losses', 'goalsFor', 'goalsAgainst', 'points'];
  matchDisplayedColumns: string[] = ['homeTeam', 'score', 'awayTeam', 'court'];

  constructor(private matchService: MatchService, private teamsService: TeamService,
              private courtService: CourtService, private userAuxService: UserAuxService,
              private snackBar: MatSnackBar,) {
    this.tournament = this.userAuxService.getTournamentDetail();
    this.table = [];
    this.matches = [];
    this.courts = [];
    this.teams = [];
    this.match = { tournamentId: this.tournament.id } as MatchDto;
  }

  ngOnInit(): void {
    this.refreshTable();
    this.refreshMatches();
    this.refreshCourts();
    this.refreshTeams();
  }

  refreshTable() {
    this.dataLoaded = 0;
    this.matchService.getTableByTournamentId(this.tournament.id).subscribe({
      next: (response) => {
        this.dataLoaded = 1;
        this.table = response.table;
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

  refreshMatches() {
    this.matchService.getByTournamentId(this.tournament.id).subscribe({
      next: (response) => {
        this.matches = response.matches;
      },
      error: (error: ErrorMessage) => {
        this.snackBar.openFromComponent(ErrorSnackBar, {
          data: {
            messages: error.message
          },
          duration: 2000
        });
      }
    });
  }

  refreshCourts() {
    this.courtService.getByBranchId(this.tournament.branch.id).subscribe({
      next: (response) => {
        this.dataLoaded = 1;
        this.courts = response.courts;
      },
      error: (error: ErrorMessage) => {
        this.snackBar.openFromComponent(ErrorSnackBar, {
          data: {
            messages: error.message
          },
          duration: 2000
        });
      }
    });
  }

  refreshTeams() {
    this.teamsService.getByTournamentId(this.tournament.id).subscribe({
      next: (response) => {
        this.dataLoaded = 1;
        this.teams = response.teams;
      },
      error: (error: ErrorMessage) => {
        this.snackBar.openFromComponent(ErrorSnackBar, {
          data: {
            messages: error.message
          },
          duration: 2000
        });
      }
    });
  }

  createMatch() {
    this.savingMatch = true;
    this.snackBar.open('Creando partido');
    this.matchService.create(this.match).subscribe({
      next: () => {
        this.savingMatch = false;
        this.snackBar.dismiss();
        this.match = { tournamentId: this.tournament.id } as MatchDto;
        this.refreshTable();
        this.refreshMatches();
      },
      error: (error: ErrorMessage) => {
        this.savingMatch = false;
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
