import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../../../services/helpers/app.service';
import { BreadcrumbService } from '../../../services/helpers/breadcrumb.service';
import { HelperService } from '../../../services/helpers/helper.service';

@Component({
  selector: 'ngx-add-bank',
  templateUrl: './add-bank.component.html',
  styleUrls: ['./add-bank.component.scss'],
})
export class AddBankComponent implements OnInit, OnDestroy {

  BankForm: FormGroup;
  id: string;
  BanksList: any[];

  bankID
  constructor(
    private appservice: AppService,
    private formBuilder: FormBuilder,
    private router: Router,
    private avRouter: ActivatedRoute,
    private breadcrumb: BreadcrumbService,
    private helper: HelperService) {
    if (this.avRouter.snapshot.params['id']) {
      this.id = this.avRouter.snapshot.params['id'];
    }
  }

  ngOnInit(): void {

    this.BankForm = this.formBuilder.group({
      branch: ['', [Validators.required]],
      account_no: ['', [Validators.required]],
      iban: ['', [Validators.required]],
      beneficiary_ar_name: ['', [Validators.required]],
      beneficiary_en_name: ['', [Validators.required]],
      swift_code: ['', [Validators.required]],
      bank_id: [null, Validators.required]
    });

    if (this.id !== undefined) {
      this.appservice.GET('banks_byId/' + this.id).subscribe(resp => {
        this.BankForm.patchValue(resp);
        this.bankID = resp.bank_id;
        this.breadcrumb.getDate({ type: 'bank', name: resp.branch });
        this.getBanksList(resp.bank_id);
      }, err => {
      });
    } else {
      this.getBanksList();
    }


  }

  addBank(): void {
    if (this.id !== undefined) {
      this.updateForm();
    } else {
      this.submitForm();
    }
  }

  submitForm() {
    this.helper.showSpinner();
    const slug = 'banks';
    const bankItem = this.BankForm.value;
    const userId = localStorage.getItem('userId');
    const requestItem = { 'bank': bankItem, 'user_id': userId };

    this.appservice.POST(slug, requestItem).subscribe(res => {
      this.router.navigate(['./pages/banks']);
      this.helper.showToastSuccess('success', 'Bank added successfully');
      this.helper.hideSpinner();
    }, err => {
      this.helper.hideSpinner();
      this.helper.showToastDanger('Error', err.error.message[Object.keys(err.error.message)[0]][0]);
    });
  }
  changeBank() {
    this.bankID = this.BankForm.value.bank_id;
  }
  updateForm() {
    this.helper.showSpinner();
    let BankItem = {
      account_no: this.BankForm.get('account_no').value,
      bank_id: this.bankID,
      beneficiary_ar_name: this.BankForm.get('beneficiary_ar_name').value,
      beneficiary_en_name: this.BankForm.get('beneficiary_en_name').value,
      branch: this.BankForm.get('branch').value,
      iban: this.BankForm.get('iban').value,
      id: this.id,
      swift_code: this.BankForm.get('swift_code').value
    }
    const slug = 'banks/' + this.id;

    this.appservice.Update(slug, BankItem).subscribe(res => {
      this.router.navigate(['./pages/banks']);
      this.helper.hideSpinner();
      this.helper.showToastSuccess('success', 'Bank updated successfully');
    }, err => {
      this.helper.hideSpinner();
      this.helper.showToastDanger('Error', err.error.message[Object.keys(err.error.message)[0]][0]);
    });
  }

  getBanksList(id?) {
    const slug = 'bank_db';
    this.helper.showSpinner();
    this.appservice.GET(slug).subscribe((res: any[]) => {
      this.helper.hideSpinner();
      this.BanksList = res;
      if (id) {
        this.bankID = id;
        const bankobject = res.filter(item => {
          return item.id == id
        })
        this.BankForm.get('bank_id').setValue(bankobject[0].name);
      }
    }, err => {
      this.helper.hideSpinner();
      this.helper.showToastDanger('Error', err.error.message[Object.keys(err.error.message)[0]][0]);
    });
  }



  ngOnDestroy() {
    this.breadcrumb.getDate({ type: 'bank', name: '' });
  }

}
