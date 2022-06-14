import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AppService } from "../../services/helpers/app.service";
import { EventsService } from "../../services/helpers/events.service";
import { HelperService } from "../../services/helpers/helper.service";
import Swal from "sweetalert2";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "ngx-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.scss"],
})
export class CheckoutComponent implements OnInit {
  lang: string;
  id: any;
  invoices: any = [];
  total_amount: any = "0.00";
  total_discount: any = "0.00";
  total: any = "0.00";
  end_date;
  payment_method: string = null;
  credintialsObj = {
    merchant_reference_id: "123456",
    customer_merchant_profile_id: "13",
    customer_name: "John Doe",
    customer_email: "example@gmail.com",
    customer_mobile: "01129365372",
    amount: "",
    signature: "",
    description: "Charge request description",
  };
  getUrlData: any;
  install_value: any;
  payment_integration: any;
  constructor(
    private avroute: ActivatedRoute,
    private helper: HelperService,
    private appService: AppService,
    private eventsService: EventsService,
    public tranlateService: TranslateService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.avroute.snapshot.params["id"];
    this.getPaymentIntegration();
    this.getURL();
    this.eventsService.changeLangObser.subscribe((res) => {
      this.lang = res;
    });
  }
  getURL() {
    this.helper.showSpinner();
    this.appService.GET(`invoices/getUrlData/${this.id}`).subscribe(
      (res: any) => {
        this.getUrlData = res;
        this.invoices = this.getInvoices(res);
        this.end_date = res?.invoice?.date_to;
        this.helper.hideSpinner();
      },
      (err) => {
        this.helper.hideSpinner();
        this.helper.showToastDanger("error", err.error.message);
      }
    );
  }
  getPaymentIntegration() {
    this.appService.GET(`payment/method`).subscribe(
      (res: any) => {
        if (res.Payment_Gateway === "NBE") {
          this.payment_integration = "nbeCheckout";
        } else if (res.Payment_Gateway === "CAE") {
          this.payment_integration = "caeCheckout";
        } else {
          this.payment_integration = "nbeCheckout";
        }
      },
      (err) => {
        this.helper.showToastDanger("error", err.error.message);
      }
    );
  }
  moneyFormatter(num: any) {
    return parseFloat(num).toFixed(2);
  }

  getCType(num) {
    if (num === "1") {
      return "Rent";
    } else if (num === "2") {
      return "Maintenance";
    } else {
      return "Installment";
    }
  }

  dateFormatter(s: string) {
    let date = s.split("-");
    return date.join("/");
  }

  getInvoices(response) {
    let results: any = [];
    if (typeof response === "object") {
      results.push({
        unit_name: response?.invoice?.contract?.unit?.name,
        contract_type: this.getCType(
          response?.invoice?.contract?.contract_type_id
        ),
        amount: this.moneyFormatter(response?.invoice.amount_total),
        discount: this.moneyFormatter(response?.invoice?.discount),
        owner: response?.invoice?.receiver?.name,
        start_date: this.dateFormatter(response?.invoice?.date_from),
        end_date: this.dateFormatter(response?.invoice?.date_to),
        isChecked: false,
        status: response?.invoice?.status,
      });
    } else {
      response.forEach((res) => {
        results.push({
          unit_name: res?.invoice?.contract?.unit?.name,
          contract_type: this.getCType(
            res?.invoices?.contract?.contract_type_id
          ),
          amount: this.moneyFormatter(res?.invoice.amount_total),
          discount: this.moneyFormatter(res?.invoice?.discount),
          owner: res?.invoice?.receiver?.name,
          start_date: this.dateFormatter(res?.invoice?.date_to),
          end_date: this.dateFormatter(res?.invoice?.date_from),
          isChecked: false,
          status: res?.invoice?.status,
        });
      });

    }
    return results;
  }
  onChange() {
    let newtotal_amount = 0;
    let newtotal_discount = 0;
    this.invoices.forEach((invoice) => {
      if (invoice.isChecked) {
        newtotal_amount += invoice.amount;
        newtotal_discount += invoice.discount;
      }
    });
    this.total_amount = this.moneyFormatter(newtotal_amount);
    this.total_discount = this.moneyFormatter(newtotal_discount);
    this.total = this.moneyFormatter(newtotal_amount - newtotal_discount);

    if (this.total_amount < this.total_discount) {
      Swal.fire({
        title: this.tranlateService.instant("The discount amount should be less the the totla amount"),
        icon: "warning",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: this.tranlateService.instant("back")
      }).then(() => {
        if (localStorage.getItem('user_type') == '2') {
          this.router.navigate(['/pages/dashboard/payer']);
        } else if (localStorage.getItem('user_type')) {
          this.router.navigate(['/pages/dashboard/super']);
        } else {
          this.router.navigate(['/auth/login']);
        }
      })
    }

  }

  past_due() {
    var today = new Date();
    var date = new Date(this.end_date);
    if (date <= today) return true;
    return false;
  }

  methodChange(method: string) {
    this.payment_method = method;
  }
  submitFawry() {
    this.helper.showSpinner();
    this.appService.POST("cowpay/fawry", {
      invoices: [
        {
          invoice_id: this.getUrlData.invoice.id,
          amount: this.total,
        },
      ],
    }).subscribe((res) => {
      window.location.href = res.url
      this.helper.hideSpinner();
    }, (err) => {
      this.helper.hideSpinner();
    });
  }
  checkout() {
    if (this.payment_method === "credit") {
      window.location.href =
        `${this.appService.dev_url}${this.payment_integration}/?currency=EGP&order_id=` +
        this.id +
        "&amount=" +
        this.total;
    } else if (this.payment_method === "fawry") {
      this.submitFawry();
    } else if (this.payment_method === "installment") {
      if (
        this.install_value == "" ||
        this.install_value == null ||
        this.install_value == undefined
      ) {
        Swal.fire({
          title: this.tranlateService.instant(
            "You must select installment period"
          ),
          icon: "warning",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: this.tranlateService.instant("Continue"),
        });
      } else {
        window.location.href =
          `${this.appService.dev_url}${this.payment_integration}/?currency=EGP&order_id=` +
          this.id +
          "&amount=" +
          this.total +
          "&install=" +
          this.install_value;
      }
    }
  }
  select_installment(value: any) {
    this.install_value = value;
  }
}
