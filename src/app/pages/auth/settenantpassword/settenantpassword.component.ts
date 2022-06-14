import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../../../services/helpers/app.service';
import { HelperService } from '../../../services/helpers/helper.service';
@Component({
  selector: 'ngx-settenantpassword',
  templateUrl: './settenantpassword.component.html',
  styleUrls: ['./settenantpassword.component.scss'],
})
export class SettenantpasswordComponent implements OnInit {

  setpasswordForm: FormGroup;
  email;
  email_code;
  constructor(
    private appservice: AppService,
    private formBuilder: FormBuilder,
    private helper: HelperService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.email = this.activatedRoute.snapshot.queryParams.email;
    this.email_code = this.activatedRoute.snapshot.queryParams.email_code;
  }


  ngOnInit() {
    this.setpasswordForm = this.formBuilder.group({
      password: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(12),
        ]),
      ],
    });
  }



  setpassword() {
    this.helper.showSpinner();
    const data = {
      email: this.email,
      email_code: this.email_code,
      password: this.setpasswordForm.get('password').value,
    };
    this.appservice.POST('users/newPassword', data).subscribe((response) => {
      this.helper.hideSpinner();
      this.helper.showToastSuccess('Success', response.message);
      return this.router.navigate(['auth/login']);
    }, err => {
      this.helper.hideSpinner();
      this.helper.showToastDanger(
        'Error',
        err.message,
      );
    });
  }

}
