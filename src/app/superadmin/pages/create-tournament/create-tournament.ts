import {Component, OnInit} from '@angular/core';
import {TournamentService} from "../../services/tournament/tournament.service";
import {TeamService} from "../../services/team/team.service";
import {TournamentDto} from "../../models/tournament.dto";
import {ErrorMessage} from "../../../shared/models/error-message";
import {ErrorSnackBar} from "../../../shared/pages/error-snack-bar/error-snack-bar";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TeamDto} from "../../models/team.dto";
import {UserDto} from "../../../core/models/user.dto";
import {UserService} from "../../../core/services/user/user.service";
import {PlayerDto} from "../../models/player.dto";
import {ActivatedRoute, Router} from "@angular/router";
import {BranchDto} from "../../../admin/models/branch.dto";
import {BranchService} from "../../../admin/services/branch/branch.service";

@Component({
  selector: 'app-create-tournament',
  standalone: false,
  templateUrl: './create-tournament.html',
  styleUrl: './create-tournament.css'
})
export class CreateTournament implements OnInit {
  tournamentNameValidated: boolean = false;
  teamNameValidated: boolean = false;
  loading: boolean = false;

  tournament: TournamentDto;
  team: TeamDto;
  users: UserDto[];
  branches: BranchDto[];
  playerCount: number = 1;

  constructor(private tournamentService: TournamentService, private teamService: TeamService,
              private userService: UserService, private branchService: BranchService,
              private snackBar: MatSnackBar, private router: Router,
              private route: ActivatedRoute) {
    this.tournament = { name: "", teams: [] as TeamDto[] } as TournamentDto;
    this.team = { name: "", players: [] as PlayerDto[] } as TeamDto;
    this.users = [];
    this.branches = [];
  }

  ngOnInit(): void {
    this.userService.getAllByTournamentManagerRole().subscribe({
      next: (response) => {
        this.users = response.users;
      },
      error: (error: ErrorMessage) => {
        this.snackBar.openFromComponent(ErrorSnackBar, {
          data: {
            messages: error.message
          },
          duration: 2000
        })
      }
    });
    this.branchService.getAll().subscribe({
      next: (response) => {
        this.branches = response.branches;
      },
      error: (error: ErrorMessage) => {
        this.snackBar.openFromComponent(ErrorSnackBar, {
          data: {
            messages: error.message
          },
          duration: 2000
        })
      }
    });
  }

  searchTournament() {
    if (this.tournament.name.trim() && this.tournament.userId !== undefined) {
      this.tournamentService.validateTournamentName(this.tournament.name).subscribe({
        next: () => {
          this.tournamentNameValidated = true;
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
    } else {
      this.snackBar.open("Ingrese el nombre del torneo y su administrador", "Entendido", { duration: 2000 });
    }
  }

  searchTeam() {
    if (this.team.name.trim() && this.playerCount > 0) {
      const isDuplicateTeam = this.tournament.teams.some(team =>
        team.name.trim().toLowerCase() === this.team.name.trim().toLowerCase()
      );

      if (isDuplicateTeam) {
        this.snackBar.open("Ya existe un equipo con ese nombre", "Entendido", { duration: 2000 });
      } else {
        this.teamService.validateTournamentName(this.team.name).subscribe({
          next: () => {
            this.teamNameValidated = true;
            this.team.players = [];
            for (let i = 0; i < this.playerCount; i++) {
              this.team.players.push({ id: i + 1, name: '', number: i + 1 } as PlayerDto);
            }
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
    } else {
      this.snackBar.open("Ingrese el nombre del equipo y la cantidad de jugadores", "Entendido", { duration: 2000 });
    }
  }

  addTeamToTournament() {
    const isValidPlayers = this.team.players.every(player =>
      player.name.trim() && player.number !== null && player.number !== undefined && player.number > 0
    );

    if (isValidPlayers) {
      this.tournament.teams.push({ ...this.team, players: [...this.team.players] });
      this.team = { name: "", players: [] as PlayerDto[] } as TeamDto;
      this.playerCount = 1;
      this.teamNameValidated = false;
    } else {
      this.snackBar.open("Información de jugadores incorrecta", "Entendido", { duration: 2000 });
    }
  }

  saveTournament() {
    this.loading = true;
    this.snackBar.open("Creando torneo");
    this.tournamentService.create(this.tournament).subscribe({
      next: () => {
        this.snackBar.dismiss()
        this.router.navigate(['../profile'], { relativeTo: this.route }).then();
      },
      error: (error: ErrorMessage) => {
        this.loading = false;
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
