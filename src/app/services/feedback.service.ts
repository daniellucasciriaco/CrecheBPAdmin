import { Injectable, Output, EventEmitter } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

/* Models */
import { Feedback } from '../models/feedback';

@Injectable()
export class FeedbackService {

  basePath = 'BDAdmin/Feedback';
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
      const feedbackList: Array<Feedback> = new Array<Feedback>();
      actions.forEach(action => {
        const json: any = action.payload.toJSON();
        const key = action.payload.key;
        const feedback: Feedback = new Feedback();
        feedback.$key = key;
        feedback.Nome = json.Nome;
        feedback.Email = json.Email;
        feedback.Mensagem = json.Mensagem;
        feedbackList.push(feedback);
      });
      this.onChilAddedSucess.emit(feedbackList);
    });
  }

  addObject(object: Feedback) {
    this.itemsRef.push(object);
  }

  deleteObject(key: string) {
    this.itemsRef.remove(key);
  }

  deleteEverything() {
    this.itemsRef.remove();
  }

}
