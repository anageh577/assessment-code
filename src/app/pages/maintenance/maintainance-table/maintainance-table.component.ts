import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from '../../../services/helpers/app.service';
import { EventsService } from '../../../services/helpers/events.service';
import { HelperService } from '../../../services/helpers/helper.service';

@Component({
  selector: 'ngx-maintainance-table',
  templateUrl: './maintainance-table.component.html',
  styleUrls: ['./maintainance-table.component.scss']
})
export class MaintainanceTableComponent implements OnInit {
  actions = "actions";
  nodata = "no data found";
  type = "Type";
  date = "Date";
  status = "Status";
  payer = "Payer";
  id = "ID";
  show: boolean = true;
  enSettingsColumns = {
    id: {
      title: "ID",
      type: "text",
    },
    type: {
      title: "Type",
      type: "text",
      filterFunction(cell?: any, search?: string) {
        const searchWord = search.toLowerCase();
        const cellName = cell.name.toLowerCase();
        console.log(cellName);

        if (cellName == searchWord || searchWord === '' || cellName.indexOf(searchWord) !== -1) {
          return cell
        } else {
          return false;
        }
      },
      valuePrepareFunction: (data) => {
        return data.name;
      },
    },
    created_on: {
      title: "Date",
      type: "text",
      valuePrepareFunction: (data) => {
        return data;
      },
    },

    payer: {
      title: "Payer",
      filterFunction(cell?: any, search?: string) {
        const searchWord = search.toLowerCase();
        const cellName = cell.name.toLowerCase();
        if (cellName == searchWord || searchWord === '' || cellName.indexOf(searchWord) !== -1) {
          return cell
        } else {
          return false;
        }
      },
      valuePrepareFunction: (data) => {
        return data.name;
      },
    },
    req_status: {
      title: "Status",
      type: "html",
      filterFunction(cell?: any, search?: string) {
        // console.log(cell);
        console.log(search);
        const searchWord = search.toLowerCase();
        const lowercasecell = cell.toLowerCase();
        if (searchWord == 'solved' || 'solved'.includes(searchWord)) {
          if (lowercasecell == '2') {
            return cell
          }
          else {
            return false;
          }
        } else if (searchWord == 'assigned to technician'  || 'assigned to technician'.includes(searchWord)) {
          if (lowercasecell == '1') {
            return cell
          }
          else {
            return false;
          }
        } else if (searchWord == 'todo'  || 'to do'.includes(searchWord)) {
          if (lowercasecell == '0') {
            return cell
          }
          else {
            return false;
          }
        }

      },
      valuePrepareFunction: (data) => {
        if (data === "2") {
          let solved;
          this.translateService.get("Solved").subscribe((res) => {
            solved = res;
          });
          return '<span class="badge badge-success">' + solved + "</span>";
        } else if (data === "1") {
          let assigned;
          this.translateService.get("Assigned to technician").subscribe((res) => {
            assigned = res;
          });
          return '<span class="badge badge-danger">' + assigned + "</span>";
        } else if (data === "0") {
          let todo;
          this.translateService.get("To do").subscribe((res) => {
            todo = res;
          });
          return '<span class="badge badge-secondary">' + todo + "</span>";
        } else {
          return data;
        }
      },
    },

  };

  settingsEn = {
    actions: {
      columnTitle: "",
      add: false,
      edit: false,
      delete: false,
    },
    columns: this.enSettingsColumns,
    noDataMessage: this.nodata,
  };

  settings = {};
  maintenanceRequests: any[] = [];
  contract_types: [] = [];
  constructor(
    private appservice: AppService,
    private router: Router,
    private helper: HelperService,
    private eventsService: EventsService,
    private translateService: TranslateService
  ) {
    this.eventsService.changeLangObser.subscribe((res) => {
      this.show = false;
      setTimeout(() => {
        this.show = true;
      }, 600);
      this.translateService.get(this.id).subscribe((res) => {
        this.enSettingsColumns.id.title = res;
      });
      this.translateService.get(this.type).subscribe((res) => {
        this.enSettingsColumns.type.title = res;
      });
      this.translateService.get(this.payer).subscribe((res) => {
        this.enSettingsColumns.payer.title = res;
      });
      this.translateService.get(this.status).subscribe((res) => {
        this.enSettingsColumns.req_status.title = res;
      });
      this.translateService.get(this.date).subscribe((res) => {
        this.enSettingsColumns.created_on.title = res;
      });
      this.translateService.get(this.actions).subscribe((res) => {
        this.settingsEn.actions.columnTitle = res;
      });
      this.translateService.get(this.nodata).subscribe((res) => {
        this.settingsEn.noDataMessage = res;
      });
      this.settings = Object.assign({}, this.settingsEn);
    });

  }
  ngOnInit(): void { this.getAllData(); }
  getAllData() {
    this.helper.showSpinner();
    this.appservice.GET('maintenances/' + localStorage.getItem('userId')).subscribe(res => {
      this.maintenanceRequests = res;
      this.helper.hideSpinner();
    }, err => {
      this.helper.hideSpinner();
    })
  }
  onUserRowSelect(event) {
    this.router.navigate(["./pages/maintenance/maintenance-details", event.data.id]);
  }
}
