import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../services/helpers/app.service';
import { HelperService } from '../../services/helpers/helper.service';

@Component({
  selector: 'ngx-banks',
  templateUrl: './banks.component.html',
  styleUrls: ['./banks.component.scss'],
})
export class BanksComponent implements OnInit {
  constructor(private appservice: AppService, public router: Router, public helper: HelperService) { }
  ngOnInit(): void {
    this.getAll();
  }
  navigateTo(id) {
    this.router.navigateByUrl('/pages/add-bank/' + id + '/edit');
  }

  banks: any = [];
  currentuserObject;
  getAll(): void {
    this.helper.showSpinner();
    const userId = localStorage.getItem('userId');
    const slug = 'banks/' + userId;
    this.appservice.GET(slug).subscribe((data: any) => {
      if (data.status === false) {
        this.helper.showToastDanger('Error', data.message);
      } else {
        this.banks = data;
      }

      this.helper.hideSpinner();
    }, err => {
      this.helper.hideSpinner();
      this.helper.showToastDanger('Error', err.error.message[Object.keys(err.error.message)[0]][0]);
    });
    this.appservice.GET('users/' + localStorage.getItem('userId')).subscribe(res => {
      this.currentuserObject = res.user;
    });
  }
  toggleMenu() {
    document.getElementById('dropdownmenu')?.classList.toggle('show-drop-down');
  }

}
