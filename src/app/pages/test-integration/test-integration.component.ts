import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from '../../services/helpers/app.service';
import { HelperService } from '../../services/helpers/helper.service';


@Component({
  selector: 'ngx-test-integration',
  templateUrl: './test-integration.component.html',
  styleUrls: ['./test-integration.component.scss'],
})
export class TestIntegrationComponent implements OnInit {
  paymentForm: FormGroup;
  credintialsObj = {
    merchant_reference_id: '25552',
    customer_merchant_profile_id: '13',
    customer_name: 'John Doe',
    customer_email: 'example@gmail.com',
    customer_mobile: '01129365372',
    amount: '10',
    signature:
      '98ade9dc50bcb54150d5e964dc2398b1ac7028442f6f4fd4d9f93538ca8e2981',
    description: 'Charge request description',
    card_number: '5123450000000008',
    cvv: '123',
    expiry_month: '05',
    expiry_year: '26',
  };
  merchant_reference_id;
  constructor(
    private appservice: AppService,
    private formBuilder: FormBuilder,
    private helper: HelperService,
  ) {
    this.paymentForm = this.formBuilder.group({
      email: ['', Validators.required],
      mobile: ['', Validators.required],
      name: ['', Validators.required],
      amount: ['', Validators.required],
    });
  }

  ngOnInit(): void { }

  submit() {

    this.credintialsObj.amount = this.paymentForm.get('amount').value;
    this.appservice
      .payment(
        'https://dev.boyot.app/boyotv2/public/api/creditcard',
        this.credintialsObj,
      )
      .subscribe(
        (res) => {
          this.COWPAYOTPDIALOG.init();
          this.COWPAYOTPDIALOG.load(res.message.token);
          this.helper.showToastSuccess('Success', '');
        },
        (err) => {
          this.helper.showToastDanger('Error', err.error.message[Object.keys(err.error.message)[0]][0]);
        },
      );
  }

  COWPAYOTPDIALOG = {
    init: function () {
      let n = document.getElementById('cowpay-otp-container');
      n ||
        ((n = document.createElement('dev')).setAttribute(
          'id',
          'cowpay-otp-container',
        ),
          document.body.appendChild(n));
      const e = document.createElement('style');
      (e.innerHTML =
        '\n    .modal {\n          display: none; /* Hidden by default */\n          position: fixed; /* Stay in place */\n          z-index: 1; /* Sit on top */\n          padding-top: 60px; /* Location of the box */\n          left: 0;\n          top: 0;\n          width: 100%; /* Full width */\n          height: 100%; /* Full height */\n          overflow: auto; /* Enable scroll if needed */\n          background-color: rgb(0,0,0); /* Fallback color */\n          background-color: rgba(0,0,0,0.4); /* Black w/ opacity */\n    }\n\n    .modal-content {\n        background-color: #fefefe;\n        margin: auto;\n        border: 1px solid #888;\n        width: 80%;\n        padding: 10px;\n    }\n\n    .close {\n        color: #aaaaaa;\n        float: right;\n        font-size: 28px;\n        font-weight: bold;\n    }\n\n    .close:hover,\n    .close:focus {\n        color: #000;\n        text-decoration: none;\n        cursor: pointer;\n    }\n        '),
        document.head.appendChild(e),
        (n.innerHTML =
          '\n            <div id="myModal" class="modal">\n                <div class="modal-content" style="overflow: hidden; background-color: transparent; border: none">\n                    <iframe id="otp-iframe" style="border: none; min-height: 800px; min-width: 100%" height="100%" width="100%"\n                        referrerpolicy="access-control-allow-origin"\n                        style="overflow: hidden"\n                    ></iframe>\n                </div>\n            </div>\n        '),
        window.addEventListener(
          'message',
          function (n) {
            n.data &&
              'cowpay' === n.data.message_source &&
              (document.getElementById('myModal').style.display = 'none');
          },
          !1,
        );
    },
    load: function (en) {
      if (document.getElementById('cowpay-otp-container')) {
        const e = document.getElementById('myModal'),
          o = document.getElementById('otp-iframe');
        (e.style.display = 'block'),
          o.setAttribute(
            'src',
            ''.concat('https://cowpay.me/', 'v2/card/form/').concat(en),
          );
      }
    },
  };
}
