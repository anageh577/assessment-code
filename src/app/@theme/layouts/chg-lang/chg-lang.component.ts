import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../../services/helpers/events.service';


@Component({
  selector: 'ngx-chg-lang',
  templateUrl: './chg-lang.component.html',
  styleUrls: ['./chg-lang.component.scss']
})
export class ChgLangComponent implements OnInit {
  lang: any;
  constructor(
    private eventsService: EventsService

  ) { }

  ngOnInit(): void {
    this.eventsService.changeLangObser.subscribe((res) => {
      this.lang = res;
    });
  }

  changeLang(){ 
    if (localStorage.getItem('rental_lang') == 'en'){ 
      localStorage.setItem('rental_lang', 'ar');
    } else {
      localStorage.setItem('rental_lang', 'en');
    }
    location.reload();
  }

}
