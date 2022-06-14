import { BehaviorSubject, Observable, throwError } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { EventsService } from "./events.service";
import { TranslateService } from "@ngx-translate/core";

@Injectable({
  providedIn: "root",
})
export class AppService {
  public dev_url = "https://dev.boyot.app/boyotv2/public/api/";
  public prod_url = "https://dashboard.boyot.app/back-end/public/api/";
  public NBE_url_dev =
    "https://test-nbe.gateway.mastercard.com/api/rest/version/61/merchant/EGPTEST1/session";
  private behaveVerified = new BehaviorSubject(0);
  obserVerified = this.behaveVerified.asObservable();
  NBE_session_id: any;
  private finishRequest = new BehaviorSubject(false);
  finishRequestObser = this.finishRequest.asObservable();

  private user = new BehaviorSubject({});
  userObser = this.user.asObservable();

  accountIsVerified: boolean;

  constructor(private translationService: TranslateService, private eventsService: EventsService, public http: HttpClient) {
    if (localStorage.getItem("userId")) {
      this.GET("users/" + localStorage.getItem("userId")).subscribe((res) => {
        this.user.next(res);
      });
    }
    this.Isverified();
  }
  public Isverified() {
    const email = localStorage.getItem("email");
    if (email !== null) {
      this.POST(`users/isVerified?email=${email}`, {}).subscribe(
        (res: any) => {
          this.behaveVerified.next(res);
          this.finishRequest.next(true);
          this.eventsService.isverifiedFun(true);
        },
        (err) => {
          this.behaveVerified.next(err.error);
          this.finishRequest.next(true);
          this.eventsService.isverifiedFun(false);
        }
      );
    }
  }
  public POST(
    slug: string,
    data: any,
    reqParams?,
    useProd: any = false
  ): Observable<any> {
    return this.http.post(useProd ? slug : this.dev_url + slug, data, {
      params: reqParams,
    })
  }

  public payment(slug: any, data: any): Observable<any> {
    return this.http.post(slug, data, {
      headers: {
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiZGMyZDMzYTA3YmYzMDQ5MWEyZTUzMDQ4ODY3YTgx" +
          "NmVmYmFhZDY4NjQ1NmY3Mjc3OGQ3YTY4ZjQ2OWU1YWJkNzk1NTZiMGEzNTcwYzcxMmQiLCJpYXQiOjE2Mz" +
          "kyMTM1ODguNDczMjk2LCJuYmYiOjE2MzkyMTM1ODguNDczMzAxLCJleHAiOjQ3OTQ4OD" +
          "cxODguNDQ1MjM2LCJzdWIiOiI4NTYiLCJzY29wZXMiOltdfQ." +
          "GRajf53_mDduBmUHyxzNKB3lcFa0pw7N7XZ6qTbgCXmglYBL" +
          "adoyl3kvurAumliNhFay9xxSEO8gb2I8YdR6-Q",
        "Content-Type": "application/json",
        "Content-Length": "<calculated when request is sent>",
        Host: "<calculated when request is sent>",
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        Connection: "keep-alive",
      },
    })
  }
  public GET(slug: any, body?: any): Observable<any> {
    return this.http.get(this.dev_url + slug, { params: body })
  }

  public Update(slug: any, data: any, reqParams?): Observable<any> {
    return this.http.put(this.dev_url + slug, data, {
      params: reqParams,
    })
  }

  public Delete(slug: any): Observable<any> {
    return this.http.delete(this.dev_url + slug)
  }

  public openUrl(slug: any) {
    const id = localStorage.getItem('userId')
    let url
    if (
      slug === 'saveUnit' ||
      slug === 'saveBuilding' ||
      slug === 'saveContract' ||
      slug === 'saveProject'
    ) {
      url = this.prod_url + slug + '?user_id=' + id
    } else {
      url = this.prod_url + slug
    }
    window.open(url, '_blank')
  }
  NBE_sessionID(data) {
    const authorizationData =
      "Basic " +
      btoa("merchant.EGPTEST1" + ":" + "61422445f6c0f954e24c7bd8216ceedf");
    const headerOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: authorizationData,
      }),
    };
    return this.http.post(this.NBE_url_dev, data, headerOptions);
  }
}
