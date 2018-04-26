import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

/* Services */
import { NewsService } from '../services/news.service';

/* Components */
import { HomeComponent } from '../home/home.component';

/* Models */
import { News } from '../models/news';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  news: Array<News> = new Array<News>();
  loading = false;

  @Input() deleteKey: string;

  constructor(private newsService: NewsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private homeComponent: HomeComponent) {
    this.loading = true;
    this.newsService.onChilAddedSucess.subscribe(data => {
      this.router.navigate(['noticias']);
      this.news = data;
      this.loading = false;
    });
  }

  ngOnInit() {
  }

  goToAddNews() {
    this.router.navigate(['adicionar-noticias']);
  }

  deleteNews(key: string) {
    this.newsService.deleteNews(key);
  }
}
