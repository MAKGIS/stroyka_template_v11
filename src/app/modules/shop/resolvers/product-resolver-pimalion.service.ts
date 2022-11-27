import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { HttpErrorResponse } from '@angular/common/http';

import { Product } from 'src/app/shared/interfaces/product';

import { RootService } from 'src/app/shared/services/root.service';
import { ShopService } from 'src/app/shared/api/shop.service';

@Injectable({
    providedIn: 'root'
})
export class ProductResolverPimalionService implements Resolve<Product> {
    constructor(
        private root: RootService,
        private router: Router,
        private shopService: ShopService,
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product> {
        // const productSlug = route.params.productSlug || route.data.productSlug;
        const productId = (route.params.productId || route.data.productId) as string;  // ???

        // return this.shopPimalionService.getProduct(productSlug).pipe(
        return this.shopService.getProductHtml(productId).pipe(
            catchError(error => {
                if (error instanceof HttpErrorResponse && error.status === 404) {
                    this.router.navigate([this.root.notFound()]).then();
                }

                return EMPTY;
            })
        );
    }
}


