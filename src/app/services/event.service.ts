import { Injectable, Output, EventEmitter } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

/* Models */
import { Event } from '../models/event';

@Injectable()
export class EventService {

  basePath = 'BDAdmin/Evento';
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;

  @Output() onNewsSucess: EventEmitter<any> = new EventEmitter();
  @Output() onNewsError: EventEmitter<any> = new EventEmitter();
  @Output() onChilAddedSucess: EventEmitter<any> = new EventEmitter();
  @Output() onChilAddedError: EventEmitter<any> = new EventEmitter();

  constructor(private db: AngularFireDatabase) {
    this.itemsRef = db.list(this.basePath);

    this.itemsRef.snapshotChanges(['child_added', 'child_removed'])
    .subscribe(actions => {
      const events: Array<Event> = new Array<Event>();
      actions.forEach(action => {
        const json: any = action.payload.toJSON();
        const key = action.payload.key;
        const event: Event = new Event();
        event.$key = key;
        event.Titulo = json.Titulo;
        event.Descricao = json.Descricao;
        event.URLFoto = json.URLFoto;
        event.DataEvento = new Date(json.DataEvento);
        events.push(event);
      });
      this.onChilAddedSucess.emit(events);
    });
  }

  addEvent(event: Event) {
    this.itemsRef.push(event);
  }

  deleteEvent(key: string) {
    this.itemsRef.remove(key);
  }

  deleteEverything() {
    this.itemsRef.remove();
  }

}
