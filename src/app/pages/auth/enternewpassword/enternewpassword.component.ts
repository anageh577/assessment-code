import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AppService } from "../../../services/helpers/app.service";
import { HelperService } from "../../../services/helpers/helper.service";

@Component({
  selector: "ngx-enternewpassword",
  templateUrl: "./enternewpassword.component.html",
  styleUrls: ["./enternewpassword.component.scss"],
})
export class EnternewpasswordComponent implements OnInit {
  createPasswordForm: FormGroup;
  isLoading: boolean;
  email;
  constructor(
    private formBuilder: FormBuilder,
    private helper: HelperService,
    private router: Router,
    private route: ActivatedRoute,
    private appservice: AppService
  ) {
    this.route.queryParams.subscribe((res) => {
      if (res.email) {
        this.email = res.email;
      } else {
        this.helper.showToastDanger("", "Please request the OTP again");
        this.router.navigate(["/auth/reset-password"]);
      }
    });
  }

  ngOnInit(): void {
    this.createPasswordForm = this.formBuilder.group({
      code: ["", [Validators.required, Validators.maxLength(6)]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    });
  }

  changepassword() {
    this.helper.showSpinner();
    const code = this.createPasswordForm.value.code;
    const password = this.createPasswordForm.value.password;
    const slug = `users/resetPassword?email=${this.email}&code=${code}&password=${password}`;
    this.appservice.POST(slug, {}).subscribe(
      (res) => {
        this.helper.hideSpinner();
        if (res.status === false) {
          this.helper.showToastDanger("Error", res.message);
        } else if (res.status === true) {
          this.helper.showToastSuccess("Success", res.message);
          this.router.navigate(["auth/login"]);
        }
      },
      (err) => {
        this.helper.hideSpinner();
        this.helper.showToastDanger("Error", err.message);
      }
    );
  }
}
