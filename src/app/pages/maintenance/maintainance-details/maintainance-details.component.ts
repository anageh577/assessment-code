import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AppService } from "../../../services/helpers/app.service";
import { BreadcrumbService } from "../../../services/helpers/breadcrumb.service";
import { HelperService } from "../../../services/helpers/helper.service";

@Component({
  selector: "ngx-maintainance-details",
  templateUrl: "./maintainance-details.component.html",
  styleUrls: ["./maintainance-details.component.scss"],
})
export class MaintainanceDetailsComponent implements OnInit {
  maintenanceDetails
  lang = localStorage.getItem('rental_lang');
  id;
  user_type = parseInt(localStorage.getItem('user_type'));
  constructor(
    private avRouter: ActivatedRoute,
    private appservice: AppService,
    private helper: HelperService,
    private breadcrumb: BreadcrumbService
  ) {
    if (this.avRouter.snapshot.params["id"]) {
      this.id = this.avRouter.snapshot.params["id"];
      this.getMaintenanceDetails(this.id);
    }
  }

  ngOnInit(): void { }
  getMaintenanceDetails(id) {
    this.helper.showSpinner();
    this.appservice.GET("maintenance/" + id).subscribe(
      (res) => {
        this.helper.hideSpinner();
        this.maintenanceDetails = res;
        this.breadcrumb.getDate({ type: "tenant", name: res.type.name });
      },
      (err) => {
        this.helper.hideSpinner();
      }
    );
  }

  updateStatus(status) {
    this.helper.showSpinner();
    this.appservice
      .POST("maintenance/updateStatus/", {
        id: this.id,
        req_status: status,
      })
      .subscribe(
        (res) => {
          this.helper.hideSpinner();
          this.maintenanceDetails.req_status = status;
        },
        (err) => {
          this.helper.hideSpinner();
        }
      );
  }
  ngOnDestroy() {
    this.breadcrumb.getDate({ type: "maintenance", name: "" });
  }
  toggleMenu() {
    document.getElementById("dropdownmenu")?.classList.toggle("show-drop-down");
  }
}
