import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import * as _ from 'lodash';

/* Services */
import { UploadService } from '../services/upload.service';
import { EventService } from '../services/event.service';

/* Models */
import { Upload } from '../models/upload';
import { Event } from '../models/event';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddEventComponent implements OnInit {
  title = '';
  description = '';
  date = '';
  formulario: FormGroup;
  selectedFiles: FileList;
  currentUpload: Upload;

  constructor(private uploadService: UploadService, private eventService: EventService, private router: Router) {
    this.uploadService.onUploadSucess.subscribe(upload => {
      const event = new Event();
      event.Titulo = this.formulario.get('title').value;
      event.Descricao = this.formulario.get('description').value;
      event.DataEvento = this.formulario.get('date').value;
      event.URLFoto = upload.url;

      this.eventService.addEvent(event);
      this.router.navigate(['eventos']);
    });

    this.uploadService.onUploadError.subscribe(err => {
      console.log(err);
    });
  }

  ngOnInit() {
    this.formulario = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      date: new FormControl(null, [Validators.required])
    });
  }

  detectFiles(event) {
    this.selectedFiles = event.target.files;
  }

  onSubmit() {
    if (this.formulario.valid) {
      this.title = this.formulario.get('title').value;
      this.description = this.formulario.get('description').value;
      this.date = this.formulario.get('date').value;
      const file = this.selectedFiles.item(0);
      this.currentUpload = new Upload(file);
      this.uploadService.pushUpload(this.currentUpload);
    }
  }

}
