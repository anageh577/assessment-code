import { Injectable } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  constructor(
    public toastrService: NbToastrService,
    public ngxspinner: NgxSpinnerService,
    private translaterService: TranslateService,
    private toastr: ToastrService) { }
  public showToastSuccess(title: string, body: string) {
    this.toastrService.success(this.translaterService.instant(body), this.translaterService.instant(title));
  }
  public showToastDanger(title: string, body: string) {
    this.toastrService.danger(this.translaterService.instant(body), this.translaterService.instant(title));
  }
  public showToastWarning(title: string, body: string) {
    this.toastrService.warning(body, title);
  }
  public showSuccess(title: string, body: string) {
    this.toastr.success(this.translaterService.instant(body), this.translaterService.instant(title));
  }
  public showSpinner() {
    this.ngxspinner.show();
  }
  public hideSpinner() {
    this.ngxspinner.hide();
  }

}
