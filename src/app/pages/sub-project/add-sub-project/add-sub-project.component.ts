import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../../../services/helpers/app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { BreadcrumbService } from '../../../services/helpers/breadcrumb.service';
import { HelperService } from '../../../services/helpers/helper.service';

@Component({
  selector: 'ngx-add-sub-project',
  templateUrl: './add-sub-project.component.html',
  styleUrls: ['./add-sub-project.component.scss'],
})
export class AddSubProjectComponent implements OnInit, OnDestroy {
  ProjectForm: FormGroup;
  id: string;
  CompanyList: [];
  statusList: [];
  projectList: [];
  subProjectFormData = new FormData();
  subProjectObj;
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

    this.ProjectForm = this.formBuilder.group({
      phase_name: ['', Validators.required],
      project_id: [null, Validators.required],
      active: [null, Validators.required],
    });


    if (this.id !== undefined) {
      this.helper.showSpinner();
      this.appservice.GET('phase/' + this.id).subscribe(resp => {
        this.subProjectObj = resp;
        this.ProjectForm.patchValue(resp);
        this.ProjectForm.get('phase_name').setValue(resp.name);
        this.ProjectForm.get('project_id').setValue(Number(resp.parent_id));
        this.breadcrumb.getDate({ type: 'sub-project', name: resp.name });
        this.helper.hideSpinner();
        this.getAllData();

      });
    } else {
      this.getAllData();
    }

  }

  addProject(): void {
    if (this.id !== undefined) {
      this.updateForm();
    } else {
      this.submitForm();
    }
  }

  submitForm() {
    this.helper.showSpinner();
    const slug = 'phase';
    for (const key in this.ProjectForm.value) {
      if (key) {
        this.subProjectFormData.append(key, this.ProjectForm.value[key]);
      }
    }
    this.appservice.POST(slug, this.subProjectFormData).subscribe(res => {
      this.helper.hideSpinner();
      this.router.navigate(['./pages/phases']);
    }, (err: any) => {
      for (const key in this.ProjectForm.value) {
        if (true) {
          this.subProjectFormData.delete(key);
        }
      }
      this.helper.hideSpinner();
      this.helper.showToastDanger('error', err.error);
    });
  }
  updateForm() {
    this.helper.showSpinner();
    const Item = this.ProjectForm.value;
    Item.id = this.id;
    const slug = 'phase/' + this.id;

    for (const key in this.ProjectForm.value) {
      if (key) {
        this.subProjectFormData.append(key, this.ProjectForm.value[key]);
      }
    }
    const params = {
      id: this.ProjectForm.value.id,
      company_id: this.ProjectForm.value.company_id,
      project_id: this.ProjectForm.value.project_id,
      active: this.ProjectForm.value.active,
      phase_name: this.ProjectForm.value.phase_name,
    };
    this.appservice.Update(slug, {}, params).subscribe(res => {
      this.helper.hideSpinner();
      this.helper.showToastSuccess('success', 'phase updated');
      this.router.navigate(['./pages/phases']);
    }, err => {
      for (const key in this.ProjectForm.value) {
        if (true) {
          this.subProjectFormData.delete(key);
        }
      }
      this.helper.hideSpinner();
      this.helper.showToastDanger('Error', err.error.message[Object.keys(err.error.message)[0]][0]);
    });
  }

  getAllData(id?) {
    this.helper.showSpinner();
    const slug1 = 'projects';
    const slug3 = 'company';
    const projects = this.appservice.GET(slug1).pipe(map(res => {
      this.projectList = res;
    }, err => {
      this.helper.showToastDanger('Error', err.error.message[Object.keys(err.error.message)[0]][0]);
    }));
    const company = this.appservice.GET(slug3).pipe(map(res => {
      this.CompanyList = res;
    }, err => {
      this.helper.showToastDanger('Error', err.error.message[Object.keys(err.error.message)[0]][0]);
    }));
    forkJoin([projects, company]).subscribe(res => {
      this.helper.hideSpinner();
    }, err => {
      this.helper.hideSpinner();
    });
  }

  ngOnDestroy() {
    this.breadcrumb.getDate({ type: 'company', name: '' });
  }

}
