import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

/* Services */
import { WorkWithUsService } from '../services/work-with-us.service';

/* Components */
import { HomeComponent } from '../home/home.component';

/* Models */
import { WorkWithUs } from '../models/work-with-us';

@Component({
  selector: 'app-work-with-us',
  templateUrl: './work-with-us.component.html',
  styleUrls: ['./work-with-us.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class WorkWithUsComponent implements OnInit {
  workWithUs: Array<WorkWithUs> = new Array<WorkWithUs>();
  loading = false;

      constructor(private workWithUsService: WorkWithUsService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private homeComponent: HomeComponent) {
        this.loading = true;
        this.workWithUsService.onChilAddedSucess.subscribe(data => {
          this.router.navigate(['trabalhe-conosco']);
          this.workWithUs = data;
          this.loading = false;
        });
      }

      ngOnInit() {
      }

      deleteObject(key: string) {
        this.workWithUsService.deleteObject(key);
      }

}
