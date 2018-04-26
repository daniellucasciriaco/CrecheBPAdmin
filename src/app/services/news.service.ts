import { Injectable, Output, EventEmitter } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

/* Models */
import { News } from '../models/news';

@Injectable()
export class NewsService {
  basePath = 'BDAdmin/Noticia';
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
      const news: Array<News> = new Array<News>();
      actions.forEach(action => {
        const json: any = action.payload.toJSON();
        const key = action.payload.key;
        const newsUnit: News = new News();
        newsUnit.$key = key;
        newsUnit.Titulo = json.Titulo;
        newsUnit.Descricao = json.Descricao;
        newsUnit.URLFoto = json.URLFoto;
        news.push(newsUnit);
      });
      this.onChilAddedSucess.emit(news);
    });
  }

  addNews(news: News) {
    this.itemsRef.push(news);
  }

  deleteNews(key: string) {
    this.itemsRef.remove(key);
  }

  deleteEverything() {
    this.itemsRef.remove();
  }
}
