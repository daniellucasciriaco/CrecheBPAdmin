import { Injectable, Output, EventEmitter } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

/* Models */
import { WorkWithUs } from '../models/work-with-us';

@Injectable()
export class WorkWithUsService {

  basePath = 'BDAdmin/TrabalheConosco';
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
      const workWithUsList: Array<WorkWithUs> = new Array<WorkWithUs>();
      actions.forEach(action => {
        const json: any = action.payload.toJSON();
        const key = action.payload.key;
        const workWithUs: WorkWithUs = new WorkWithUs();
        workWithUs.$key = key;
        workWithUs.Nome = json.Nome;
        workWithUs.Email = json.Email;
        workWithUs.CartaApresentacao = json.CartaApresentacao;
        workWithUsList.push(workWithUs);
      });
      this.onChilAddedSucess.emit(workWithUsList);
    });
  }

  addObject(object: WorkWithUs) {
    this.itemsRef.push(object);
  }

  deleteObject(key: string) {
    this.itemsRef.remove(key);
  }

  deleteEverything() {
    this.itemsRef.remove();
  }

}
