import { Component, OnInit } from "@angular/core";
import { AppService } from "../../services/helpers/app.service";
import { ActivatedRoute, Router } from "@angular/router";
@Component({
  selector: "ngx-NBE",
  templateUrl: "./NBE.component.html",
  styleUrls: ["./NBE.component.scss"],
})
export class NBEComponent implements OnInit {
  invoiceid: any;
  price: any;
  constructor(
    private avroute: ActivatedRoute,
    private appservice: AppService,
    public router: Router
  ) {
    this.price = this.avroute.snapshot.params["price"];
    this.invoiceid = this.avroute.snapshot.params["invoiceId"];
  }

  ngOnInit() {
    setTimeout(() => {
      this.postinvoice();
    }, 500);
  }
  postinvoice() {
    const invoiceObj = {};
    invoiceObj[this.invoiceid] = this.price;
    const sentObj = {
      payment_method: 1,
      invoices: invoiceObj,
    };
    this.appservice.POST(`receipt`, sentObj).subscribe(
      () => {
        window.location.href = "https://e-rent.boyot.app/";
      },
      (err) => {
      }
    );
  }
}
