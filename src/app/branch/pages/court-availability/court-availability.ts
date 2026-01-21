import {Component, Input, OnInit} from '@angular/core';
import {CourtDto} from "../../models/court.dto";
import {UserAuxService} from "../../../shared/services/user-aux/user-aux.service";

@Component({
  selector: 'app-court-availability',
  standalone: false,
  templateUrl: './court-availability.html',
  styleUrl: './court-availability.css'
})
export class CourtAvailability implements OnInit {
  @Input() injected: boolean = false;

  dataLoaded: number = 1;

  court: CourtDto;

  blockedTimes = [
    {
      id: 1,
      title: 'Mantenimiento de Redes',
      type: 'maintenance',
      dateRange: '20 Jan 2026 - 20 Jan 2026',
      timeRange: '08:00 - 10:00',
      isRecurring: false
    },
    {
      id: 2,
      title: 'Clase de Tenis - Prof. García',
      type: 'class',
      dateRange: '20 Jan 2026 - 20 Mar 2026',
      timeRange: '16:00 - 18:00',
      isRecurring: true,
      days: ['Lunes', 'Miércoles']
    },
    {
      id: 3,
      title: 'Torneo Relámpago Local',
      type: 'event',
      dateRange: '25 Jan 2026 - 26 Jan 2026',
      timeRange: '09:00 - 21:00',
      isRecurring: false
    },
    {
      id: 4,
      title: 'Limpieza de Superficie',
      type: 'maintenance',
      dateRange: '22 Jan 2026 - 22 Jan 2026',
      timeRange: '13:00 - 14:00',
      isRecurring: false
    }
  ];

  displayedColumns: string[] = ['icon', 'title', 'actions'];

  constructor(private userAuxService: UserAuxService) {
    this.court = this.userAuxService.getCourt();
    console.log(this.court);
  }

  async ngOnInit(): Promise<void> {
    /*try {
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
    }*/
  }

  deleteBlock(id: number) {
    this.blockedTimes = this.blockedTimes.filter(item => item.id !== id);
    console.log('Eliminando bloqueo:', id);
  }
}
