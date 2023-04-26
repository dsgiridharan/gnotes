import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private noteSubject = new Subject<any>();

  publishNoteEvent(data: any) {
    this.noteSubject.next(data);
  }

  getPublishedNote(): Subject<any> {
    return this.noteSubject;
  }
}
