import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

/* Services */
import { FeedbackService } from '../services/feedback.service';

/* Components */
import { HomeComponent } from '../home/home.component';

/* Models */
import { Feedback } from '../models/feedback';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FeedbackComponent implements OnInit {
  feedbackList: Array<Feedback> = new Array<Feedback>();
  loading = false;

        constructor(private feedbackService: FeedbackService,
          private router: Router,
          private activatedRoute: ActivatedRoute,
          private homeComponent: HomeComponent) {
          this.loading = true;
          this.feedbackService.onChilAddedSucess.subscribe(data => {
            this.router.navigate(['feedback']);
            this.feedbackList = data;
            this.loading = false;
          });
        }

        ngOnInit() {
        }

        deleteObject(key: string) {
          this.feedbackService.deleteObject(key);
        }

}
