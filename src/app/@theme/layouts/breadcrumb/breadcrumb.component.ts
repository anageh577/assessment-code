import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { BreadcrumbService } from "../../../services/helpers/breadcrumb.service";
export interface Breadcrumb {
  label: string;
  url: string;
}
@Component({
  selector: "ngx-breadcrumb",
  templateUrl: "./breadcrumb.component.html",
  styleUrls: ["./breadcrumb.component.scss"],
})
export class BreadcrumbComponent {
  breadcrumbs$: Observable<Breadcrumb[]>;
  breads: any[] = [];
  constructor(
    private readonly breadcrumbService: BreadcrumbService,
    private router: Router
  ) {
    this.breadcrumbs$ = this.breadcrumbService.breadcrumbs$;
    this.breadcrumbs$.subscribe((res) => {
      if (res.length > 0) {
        const breadResponse = res[0].label.split("/");
        this.breads = breadResponse;
      } else {
        this.breads = [""];
      }
    });
  }
  navigate(nav, i) {
    if (i != this.breads.length - 1) {
      if (nav === "Home") {
        this.router.navigate([""]);
      } else {
        this.router.navigate(["pages/" + nav]);
      }
    }
  }
}
