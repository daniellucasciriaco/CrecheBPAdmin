import { Injectable, Output, EventEmitter } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

/* Models */
import { Collaborator } from '../models/collaborator';

@Injectable()
export class CollaboratorService {
  basePath = 'BDAdmin/Colaborador';
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
      const collaborators: Array<Collaborator> = new Array<Collaborator>();
      actions.forEach(action => {
        const json: any = action.payload.toJSON();
        const key = action.payload.key;
        const collaborator: Collaborator = new Collaborator();
        collaborator.$key = key;
        collaborator.Nome = json.Nome;
        collaborator.Email = json.Email;
        collaborator.Endereco = json.Endereco;
        collaborator.Data = new Date(json.Data);
        collaborator.Tipo = json.Tipo;
        collaborator.URLFoto = json.URLFoto;
        collaborators.push(collaborator);
      });
      this.onChilAddedSucess.emit(collaborators);
    });
  }

  addCollaborator(news: Collaborator) {
    this.itemsRef.push(news);
  }

  deleteCollaborator(key: string) {
    this.itemsRef.remove(key);
  }

  deleteEverything() {
    this.itemsRef.remove();
  }
}
