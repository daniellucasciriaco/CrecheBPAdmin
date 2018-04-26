import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

/* Services */
import { CollaboratorService } from '../services/collaborator.service';

/* Components */
import { HomeComponent } from '../home/home.component';

/* Models */
import { Collaborator } from '../models/collaborator';

@Component({
  selector: 'app-collaborators',
  templateUrl: './collaborators.component.html',
  styleUrls: ['./collaborators.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CollaboratorsComponent implements OnInit {
  collaborators: Array<Collaborator> = new Array<Collaborator>();
  loading = false;

    @Input() deleteKey: string;

    constructor(private collaboratorService: CollaboratorService,
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private homeComponent: HomeComponent) {
      this.loading = true;
      this.collaboratorService.onChilAddedSucess.subscribe(data => {
        this.router.navigate(['colaboradores']);
        this.collaborators = data;
        this.loading = false;
      });
    }

    ngOnInit() {
    }

    goToAddCollaborator() {
      this.router.navigate(['adicionar-colaborador']);
    }

    deleteCollaborator(key: string) {
      this.collaboratorService.deleteCollaborator(key);
    }

    getTipo(key: string) {
      if (key === 'D') {
        return 'Doador';
      } else {
        return 'Voluntário';
      }
    }
}
