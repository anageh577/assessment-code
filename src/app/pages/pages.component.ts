import { TranslateService } from "@ngx-translate/core";
import { NbIconLibraries, NbMenuService } from "@nebular/theme";
import { ChangeDetectorRef, Component } from "@angular/core";
import { AppService } from "../services/helpers/app.service";
import {
  Acountanten,
  Companyen,
  CompanyOperationen,
  LandLorden,
  Manageren,
  Payeren,
} from "./user-roles";
import { User } from "../interfaces/user.interface";
import { EventsService } from "../services/helpers/events.service";

@Component({
  selector: "ngx-pages",
  styleUrls: ["pages.component.scss"],
  template: `

    <ngx-one-column-layout>
      <nb-menu [items]="menu">
      </nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {
  menu;
  userRole = "";
  menuEnglish;
  menuArabic;
  constructor(
    private appservice: AppService,
    menu: NbMenuService,
    private translateService: TranslateService,
    private eventsService: EventsService,
    private cd: ChangeDetectorRef,
    private iconLibraries: NbIconLibraries,
  ) {

    this.iconLibraries.registerFontPack("fas", {
      packClass: "fas",
      iconClassPrefix: "fa",
    });
    this.iconLibraries.registerFontPack("far", {
      packClass: "far",
      iconClassPrefix: "fa",
    });
    this.iconLibraries.registerFontPack("fa", {
      packClass: "fa",
      iconClassPrefix: "fa",
    });
    this.iconLibraries.registerFontPack("fab", {
      packClass: "fab",
      iconClassPrefix: "fa",
    });
    this.iconLibraries.registerFontPack("fal", {
      packClass: "fal",
      iconClassPrefix: "fal",
    });
    this.iconLibraries.registerSvgPack("company", {
      company: '<img src="../../assets/icons/company-01.svg" width="30px">',
    });
    this.iconLibraries.registerSvgPack("home", {
      home: '<img src="../../assets/icons/icon_dashboard.svg" width="30px">',
    });
    this.iconLibraries.registerSvgPack("unit", {
      unit: '<img src="../../assets/icons/icon_units.svg" width="30px">',
    });
    this.iconLibraries.registerSvgPack("building", {
      building:
        '<img src="../../assets/icons/icon_buildings.svg" width="30px">',
    });
    this.iconLibraries.registerSvgPack("contracts", {
      contracts:
        '<img src="../../assets/icons/icon_contracts.svg" width="30px">',
    });
    this.iconLibraries.registerSvgPack("Settings", {
      Settings: '<img src="../../assets/icons/icon_settings.svg" width="30px">',
    });
    this.iconLibraries.registerSvgPack("payments", {
      trans: '<img src="../../assets/icons/trans-01.svg" width="30px">',
    });
    this.iconLibraries.registerSvgPack("trans", {
      trans: '<img src="../../assets/icons/icon_transfers.svg" width="30px">',
    });
    this.iconLibraries.registerSvgPack("banks", {
      banks: '<img src="../../assets/icons/icon_banks.svg" width="30px">',
    });
    this.iconLibraries.registerSvgPack("ten", {
      ten: '<img src="../../assets/icons/icon_payers.svg" width="30px">',
    });
    this.iconLibraries.registerSvgPack("report", {
      report: '<img src="../../assets/icons/icon_reports.svg" width="30px">',
    });
    this.iconLibraries.registerSvgPack("invoice", {
      invoice: '<img src="../../assets/icons/icon_invoices.svg" width="30px">',
    });
    this.iconLibraries.registerSvgPack("projects", {
      projects: '<img src="../../assets/icons/icon_projects.svg" width="30px">',
    });
    this.iconLibraries.registerSvgPack("users", {
      users: '<img src="../../assets/icons/icon_users.svg" width="30px">',
    });
    this.iconLibraries.registerSvgPack("lang", {
      lang: '<img src="../../assets/icons/icon_language.svg" width="30px">',
    });
    this.iconLibraries.registerSvgPack("status", {
      status: '<img src="../../assets/icons/icon_Status.svg" width="30px">',
    });
    this.iconLibraries.registerSvgPack("maintenance", {
      maintenance:
        '<img src="../../assets/icons/icon_maintenance.svg" width="30px">',
    });
    this.iconLibraries.registerSvgPack("sub-projects", {
      "sub-projects":
        '<img src="../../assets/icons/icon_phase.svg" width="30px">',
    });
    this.iconLibraries.setDefaultPack("far");

    this.appservice.userObser.subscribe(
      (res: User) => {
        this.userRole = res?.user?.role;
        switch (parseInt(localStorage.getItem("user_type"))) {
          case 1:
            this.menuEnglish = LandLorden;
            break;
          case 2:
            this.menuEnglish = Payeren;
            break;
          case 3:
            this.menuEnglish = Companyen;
            break;
          case 4:
            this.menuEnglish = CompanyOperationen;
            break;
          case 5:
            this.menuEnglish = Acountanten;
            break;
          case 6:
            this.menuEnglish = Manageren;
            break;
          default:
            break;
        }
        if (localStorage.getItem("rental_lang") === "en") {
          this.menu = this.menuEnglish;
        } else if (localStorage.getItem("rental_lang") === "ar") {
          this.menu = this.menuEnglish;
        } else {
          this.menu = this.menuEnglish;
        }
      },
      (err) => { }
    );
    menu.onItemClick().subscribe((item: any) => {
      if (item.item.data === "change-language") {
        if (localStorage.getItem("rental_lang") === "ar") {
          localStorage.setItem("rental_lang", "en");
          this.translateService.use("en");
          window.location.reload();
          this.menu = this.menuEnglish;
          document.body.dir = "ltr";
          this.eventsService.changeLanguage();
          this.cd.detectChanges();
        } else if (localStorage.getItem("rental_lang") === "en") {
          localStorage.setItem("rental_lang", "ar");
          this.menu = this.menuEnglish;
          this.translateService.use("ar");
          window.location.reload();

          document.body.dir = "rtl";
          this.eventsService.changeLanguage();
          this.cd.detectChanges();
        } else {
          localStorage.setItem("rental_lang", "ar");
          this.menu = this.menuEnglish;
          this.translateService.use("ar");
          window.location.reload();

          document.body.dir = "rtl";
          this.eventsService.changeLanguage();
          this.cd.detectChanges();
        }
      }
    });
  }
}
