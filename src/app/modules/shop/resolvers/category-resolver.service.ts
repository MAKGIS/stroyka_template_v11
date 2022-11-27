import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

import { RootService } from 'src/app/shared/services/root.service';
import { ShopService } from 'src/app/shared/api/shop.service';

@Injectable({
    providedIn: 'root'
})
export class CategoryResolverService implements Resolve<any> {
    constructor(
        private root: RootService,
        private router: Router,
        private shop: ShopService,
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        const categorySlug: string = route.params.categorySlug || route.data.categorySlug || null;

        if (categorySlug === null) {
            return null;
        }

        console.log("CategoryResolverService.resolve() route.params.categorySlug -> %o  route.data.categorySlug -> %o",
                  route.params.categorySlug, route.data.categorySlug);

        return this.shop.getCategory(categorySlug).pipe(
            catchError(error => {
                if (error instanceof HttpErrorResponse && error.status === 404) {
                    this.router.navigateByUrl(this.root.notFound()).then();
                }

                return EMPTY;
            })
        );

    }
}
