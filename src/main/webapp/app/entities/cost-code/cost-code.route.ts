import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { CostCodeComponent } from './cost-code.component';
import { CostCodeDetailComponent } from './cost-code-detail.component';
import { CostCodePopupComponent } from './cost-code-dialog.component';
import { CostCodeDeletePopupComponent } from './cost-code-delete-dialog.component';

@Injectable()
export class CostCodeResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const costCodeRoute: Routes = [
    {
        path: 'cost-code',
        component: CostCodeComponent,
        resolve: {
            'pagingParams': CostCodeResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CostCodes'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'cost-code/:id',
        component: CostCodeDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CostCodes'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const costCodePopupRoute: Routes = [
    {
        path: 'cost-code-new',
        component: CostCodePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CostCodes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cost-code/:id/edit',
        component: CostCodePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CostCodes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cost-code/:id/delete',
        component: CostCodeDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CostCodes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
