import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Data, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
export interface Breadcrumb {
    label: string;
    url: string;
}

export interface EditData {
    type: string;
    name: string;
}

@Injectable({
    providedIn: 'root',
})

export class BreadcrumbService {
    // Subject emitting the breadcrumb hierarchy
    private readonly _breadcrumbs$ = new BehaviorSubject<Breadcrumb[]>([]);
    readonly breadcrumbs$ = this._breadcrumbs$.asObservable();
    data = new BehaviorSubject<EditData[]>([]);
    dataObs = this.data.asObservable();
    // Observable exposing the breadcrumb hierarchy
    dataE = { type: '', name: '' };
    constructor(private router: Router) {
        this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event) => {
            // Construct the breadcrumb hierarchy
            const root = this.router.routerState.snapshot.root;
            const breadcrumbs: Breadcrumb[] = [];
            this.addBreadcrumb(root, breadcrumbs, this.dataObs);

            // Emit the new hierarchy
            this._breadcrumbs$.next(breadcrumbs);
        });
    }

    private addBreadcrumb(route: ActivatedRouteSnapshot, breadcrumbs: Breadcrumb[], data, callback?) {
        if (route) {
            // Add an element for the current route part
            if (route.data.breadcrumb) {
                const breadcrumb: any = {
                    label: this.getLabel(route.data),
                };
                breadcrumbs.push(breadcrumb);
            }
            this.addBreadcrumb(route.firstChild, breadcrumbs, data);
            // Add another element for the next route part
        }
    }

    private getLabel(data: Data) {
        if (data.breadcrumb === 'function') {
            return data.breadcrumb(data);
        } else if (data.breadcrumb) {
            if (data.breadcrumb.includes('edit')) {
                const breadcrumbObj = { breadcrumb: '' };
                const breadcrumbV = data.breadcrumb.replace('edit', '');
                let myobj;
                this.data.subscribe(res => {
                    myobj = res;
                    breadcrumbObj.breadcrumb = breadcrumbV + this.dataE.name;
                    const arrObs: any[] = [{ 'label': breadcrumbObj.breadcrumb }];
                    this._breadcrumbs$.next(arrObs);
                });
                return breadcrumbObj.breadcrumb;
            } else {
                return data.breadcrumb;
            }
        }
    }
    getDate(data) {
        this.dataE = data;
        this.data.next(data);
        this.data.subscribe((res: any) => {
            this.dataObs = res;
        });
    }
}
