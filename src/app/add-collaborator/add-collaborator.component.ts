import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import * as _ from 'lodash';

/* Services */
import { UploadService } from '../services/upload.service';
import { CollaboratorService } from '../services/collaborator.service';

/* Models */
import { Upload } from '../models/upload';
import { Collaborator } from '../models/collaborator';

@Component({
  selector: 'app-add-collaborator',
  templateUrl: './add-collaborator.component.html',
  styleUrls: ['./add-collaborator.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddCollaboratorComponent implements OnInit {
  name = '';
  email = '';
  date = '';
  address = '';
  type = '';
  formulario: FormGroup;
  selectedFiles: FileList;
  currentUpload: Upload;

  constructor(private uploadService: UploadService, private collaboratorService: CollaboratorService, private router: Router) {
    this.uploadService.onUploadSucess.subscribe(upload => {
      const collaborator = new Collaborator();
      collaborator.Nome = this.formulario.get('name').value;
      collaborator.Email = this.formulario.get('email').value;
      collaborator.Data = this.formulario.get('date').value;
      collaborator.Tipo = this.formulario.get('tipo').value;
      collaborator.Endereco = this.formulario.get('endereco').value;
      collaborator.URLFoto = upload.url;

      this.collaboratorService.addCollaborator(collaborator);
      this.router.navigate(['colaboradores']);
    });

    this.uploadService.onUploadError.subscribe(err => {
      console.log(err);
    });
  }

  ngOnInit() {
    this.formulario = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
      tipo: new FormControl(null, [Validators.required]),
      date: new FormControl(null, [Validators.required]),
      endereco: new FormControl(null, [Validators.required])
    });
  }

  detectFiles(event) {
    this.selectedFiles = event.target.files;
  }

  onSubmit() {
    if (this.formulario.valid) {
      this.name = this.formulario.get('name').value;
      this.email = this.formulario.get('email').value;
      this.type = this.formulario.get('tipo').value;
      this.address = this.formulario.get('endereco').value;
      this.date = this.formulario.get('date').value;
      const file = this.selectedFiles.item(0);
      this.currentUpload = new Upload(file);
      this.uploadService.pushUpload(this.currentUpload);
    }
  }
}
