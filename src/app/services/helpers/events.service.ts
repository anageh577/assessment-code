
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  private updateprofile = new BehaviorSubject(false);
  updateprofileObser = this.updateprofile.asObservable();

  private changeLang = new BehaviorSubject(localStorage.getItem('rental_lang'));
  changeLangObser = this.changeLang.asObservable();


  private refreshunits = new BehaviorSubject('refresh');
  refreshunitsObser = this.refreshunits.asObservable();

  private refreshprojects = new BehaviorSubject('refresh');
  refreshprojectsObser = this.refreshprojects.asObservable();

  private refreshubuildings = new BehaviorSubject('refresh');
  refreshubuildingsObser = this.refreshubuildings.asObservable();

  private refreshtenants = new BehaviorSubject('refresh');
  refreshtenantsObser = this.refreshtenants.asObservable();


  private isverified = new BehaviorSubject(false);
  isverifiedObser = this.isverified.asObservable();


  private loginevent = new BehaviorSubject('');
  logineventObser = this.loginevent.asObservable();

  private dashboardresponsePaid = new BehaviorSubject<Array<any>>([]);
  dashboardresponsePaidObser = this.dashboardresponsePaid.asObservable();

  private dashboardresponseUpcoming = new BehaviorSubject<Array<any>>([]);
  dashboardresponseUpcomingObser = this.dashboardresponseUpcoming.asObservable();
  constructor() { }

  dashboardresponsePaidFun(response) {
    this.dashboardresponsePaid.next(response);
  }

  dashboardresponseUpcomingFun(response) {
    this.dashboardresponseUpcoming.next(response);
  }
  logineventfunction(id) {
    this.loginevent.next(id);
  }
  updateprofileFun() {
    this.updateprofile.next(true);
  }
  changeLanguage() {
    this.changeLang.next(localStorage.getItem('rental_lang'));
  }

  refreshunitsFun() {
    this.refreshunits.next('refresh');
  }
  refreshbuildingsFun() {
    this.refreshubuildings.next('refresh');
  }

  refreshtenantsFun() {
    this.refreshtenants.next('refresh');
  }

  refresprojectsFun() {
    this.refreshprojects.next('refresh');
  }
  isverifiedFun(val) {
    this.isverified.next(val);
  }

}
