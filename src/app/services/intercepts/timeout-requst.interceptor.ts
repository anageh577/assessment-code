import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { HelperService } from '../helpers/helper.service';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';
@Injectable()
export class TimeoutRequstInterceptor implements HttpInterceptor {
  private pendingHTTPRequests$ = new Subject<void>();
  messageIsOpened: boolean = false;
  successrequest: boolean = false;
  constructor(private helper: HelperService, private translateService: TranslateService) { }
  public onCancelPendingRequests(): Observable<any> {
    return this.pendingHTTPRequests$.asObservable();
  }
  public cancelPendingRequests() {
    this.pendingHTTPRequests$.next();
  }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const start = Date.now();
    setTimeout(() => {
      if (((Date.now() - start)) > 20000 && !this.successrequest) {
        this.helper.hideSpinner();
        this.cancelPendingRequests();
        if (!this.messageIsOpened) {
          this.messageIsOpened = true
          Swal.fire({
            title: this.translateService.instant("Check internet connection"),
            icon: "warning",
            showCancelButton: true,
            showConfirmButton: false,
            cancelButtonColor: "#d33",
            cancelButtonText: this.translateService.instant('refresh')
          }).then(() => {
            this.messageIsOpened = false;
            window.location.reload();
          })
        }
      }
    }, 21000);

    return next.handle(req).pipe(takeUntil(this.onCancelPendingRequests()),
      tap(event => {
        if (event instanceof HttpResponse) {
          this.successrequest = true;
        }
      }, error => {
        if (error.status) {
          this.successrequest = true;
        } else {
          this.successrequest = false;
        }
      }))
  }
}
