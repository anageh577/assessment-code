import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../services/helpers/app.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { EventsService } from '../../../services/helpers/events.service';
import { HelperService } from '../../../services/helpers/helper.service';

@Component({
  selector: 'ngx-sub-project-table',
  templateUrl: './sub-project-table.component.html',
  styleUrls: ['./sub-project-table.component.scss'],
})
export class SubProjectTableComponent implements OnInit {
  actions = 'actions';
  nodata = 'no data found';
  show: boolean = true;
  idname = 'ID';
  phasename = 'Phase Name';
  enSettingsColumns = {
    id: {
      title: 'ID',
      type: 'number',
    },
    name: {
      title: 'Phase Name',
      type: 'string',
    },
  };

  settingsEn = {
    actions: {
      columnTitle: '',
      custom: [
        {
          name: 'editAction',
          title: '<i class="nb-edit" title="Edit"></i>',
        },
        {
          name: 'deleteAction',
          title: '<i class="nb-trash" title="delete"></i>',
        },
      ],
      add: false,
      edit: false,
      delete: false,
    },
    columns: this.enSettingsColumns,
    noDataMessage: 'no data found',
  };


  settings = {};
  phases: any = [];

  constructor(
    private eventsService: EventsService,
    private appservice: AppService,
    private router: Router,
    private helper: HelperService,
    private translateService: TranslateService) {
    this.eventsService.changeLangObser.subscribe((res) => {
      this.show = false;
      setTimeout(() => {
        this.show = true;
      }, 600);
      this.translateService.get(this.idname).subscribe(res => {
        this.enSettingsColumns.id.title = res;
      });
      this.translateService.get(this.phasename).subscribe(res => {
        this.enSettingsColumns.name.title = res;
      });
      this.translateService.get(this.actions).subscribe(res => {
        this.settingsEn.actions.columnTitle = res;
      });
      this.translateService.get(this.nodata).subscribe(res => {
        this.settingsEn.noDataMessage = res;
      });
      this.settings = Object.assign({}, this.settingsEn);
    });
    this.getAll();
  }

  getAll(): void {
    const slug = 'phases';
    this.helper.showSpinner();
    this.appservice.GET(slug).subscribe((data: any) => {
      this.phases = data;
      this.helper.hideSpinner();
    }, err => {
      this.helper.hideSpinner();
    });
  }

  ngOnInit(): void {
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  deleteItem(id): void {
    if (window.confirm('Are you sure you want to delete?')) {
      const slug = 'phase/' + id;
      this.helper.showSpinner();
      this.appservice.Delete(slug).subscribe((data: any) => {
        this.helper.hideSpinner();
        this.getAll();
      }, err => {
        this.helper.hideSpinner();
        this.helper.showToastDanger('Error', err.error.message[Object.keys(err.error.message)[0]][0]);
      });
    }
  }

  route(event): void {

    const id = event.data.id;
    if (event.action === 'editAction') {
      this.router.navigate(['./pages/phases/add-phase', id, 'edit']);
    } else if (event.action === 'deleteAction') {
      this.deleteItem(id);
    }
  }
}
