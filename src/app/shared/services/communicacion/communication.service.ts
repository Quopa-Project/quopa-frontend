import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  userInfoChanged = new EventEmitter<{ infoChanged: string }>();

  emitUserInfoChange(info: { infoChanged: string }) {
    this.userInfoChanged.emit(info);
  }
}
