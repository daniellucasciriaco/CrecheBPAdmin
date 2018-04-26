import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

/* Services */
import { EventService } from '../services/event.service';

/* Components */
import { HomeComponent } from '../home/home.component';

/* Models */
import { Event } from '../models/event';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EventsComponent implements OnInit {
  events: Array<Event> = new Array<Event>();
  loading = false;

    constructor(private eventService: EventService,
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private homeComponent: HomeComponent) {
      this.loading = true;
      this.eventService.onChilAddedSucess.subscribe(data => {
        this.router.navigate(['eventos']);
        this.events = data;
        this.loading = false;
      });
    }

    ngOnInit() {
    }

    goToAddEvent() {
      this.router.navigate(['adicionar-evento']);
    }

    deleteEvent(key: string) {
      this.eventService.deleteEvent(key);
    }
}
