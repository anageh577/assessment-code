import { Component } from '@angular/core';
import { EventsService } from '../../../services/helpers/events.service';

@Component({
  selector: 'ngx-custome-stepper',
  templateUrl: './custome-stepper.component.html',
  styleUrls: ['./custome-stepper.component.scss'],
})
export class CustomeStepperComponent {
  lang;
  constructor(
    private eventsService: EventsService,
  ) {
    this.lang = localStorage.getItem('rental_lang');
    this.eventsService.changeLangObser.subscribe(res => {
      this.lang = res;
    });
  }
}
