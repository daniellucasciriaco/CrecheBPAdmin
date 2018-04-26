import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import * as _ from 'lodash';

/* Services */
import { UploadService } from '../services/upload.service';
import { NewsService } from '../services/news.service';

/* Models */
import { Upload } from '../models/upload';
import { News } from '../models/news';

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddNewsComponent implements OnInit {
  title = '';
  description = '';
  formulario: FormGroup;
  selectedFiles: FileList;
  currentUpload: Upload;

  constructor(private uploadService: UploadService, private newsService: NewsService, private router: Router) {
    this.uploadService.onUploadSucess.subscribe(upload => {
      const news = new News();
      news.Titulo = this.formulario.get('title').value;
      news.Descricao = this.formulario.get('description').value;
      news.URLFoto = upload.url;

      this.newsService.addNews(news);
      this.router.navigate(['noticias']);
    });

    this.uploadService.onUploadError.subscribe(err => {
      console.log(err);
    });
  }

  ngOnInit() {
    this.formulario = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required])
    });
  }

  detectFiles(event) {
    this.selectedFiles = event.target.files;
  }

  onSubmit() {
    if (this.formulario.valid) {
      this.title = this.formulario.get('title').value;
      this.description = this.formulario.get('description').value;
      const file = this.selectedFiles.item(0);
      this.currentUpload = new Upload(file);
      this.uploadService.pushUpload(this.currentUpload);
    }
  }

}
