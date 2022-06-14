import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AppService } from "../../../services/helpers/app.service";
import { EventsService } from "../../../services/helpers/events.service";
import { HelperService } from "../../../services/helpers/helper.service";
import { PendingPaymentsComponent } from './pending-payments/pending-payments.component';

@Component({
  selector: 'ngx-payer-dashboard',
  templateUrl: './payer-dashboard.component.html',
  styleUrls: ['./payer-dashboard.component.scss']
})
export class PayerDashboardComponent implements OnInit {
  lang;
  id: string;
  paid: any[] = [];
  pending: any[] = [];
  money;
  constructor(
    private appservice: AppService,
    private avRouter: ActivatedRoute,
    private helper: HelperService,
    private eventsService: EventsService,
    public router: Router
  ) {
    this.eventsService.changeLangObser.subscribe((res) => {
      this.lang = res;
    });
    if (this.avRouter.snapshot.params["id"]) {
      this.id = this.avRouter.snapshot.params["id"];
    }
  }

  ngOnInit(): void {
    this.id = localStorage.getItem('userId');
    this.helper.showSpinner();
    this.appservice.GET('invoices/payer/' + this.id).subscribe(res => {
      this.helper.hideSpinner();
      if (res.paid.length > 0) {
        this.paid = res.paid.slice(0, 5);
      }
      if (res.unpaid.length > 0) {
        this.pending = res.unpaid.slice(0, 5);
      }
      this.money = this.moneyFormatter(res?.amount_remaining);
    });
  }
  moneyFormatter(num: any) {
    return parseFloat(num).toFixed(2);
  }

  details(invoice: any) {
    this.router.navigate(["./pages/view-invoice", invoice.id]);
  }
}
