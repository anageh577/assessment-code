import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { EventsService } from '../helpers/events.service';
import { HelperService } from '../helpers/helper.service';

@Injectable()
export class InterceptInterceptor implements HttpInterceptor {

  constructor(private helper: HelperService, private eventsService: EventsService) { }
  isVerified: boolean;
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.eventsService.isverifiedObser.subscribe(res => {
      this.isVerified = res;
    });
    if (request.url.includes('users/') ||
      request.url.includes('users') ||
      request.url.includes('country') ||
      request.url.includes('city') ||
      request.url.includes('gateway') ||
      request.url.includes('receipt') ||
      request.url.includes('cowpay/fawry') ||
      request.method === 'GET') {
      return next.handle(request);
    } else {
      if (this.isVerified === true) {
        return next.handle(request);
      } else {
        this.helper.hideSpinner();
        this.helper.showToastWarning('Warning', 'Please verify your email account to proceed.');
        return EMPTY;
      }
    }
  }
}
