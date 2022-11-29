import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Product } from '../../../shared/interfaces/product';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { RootService } from '../../../shared/services/root.service';
import { ShopService } from '../../../shared/api/shop.service';
import { getModeSource } from 'src/fake-server/database/brands';

@Injectable({
    providedIn: 'root'
})
export class ProductResolverService implements Resolve<Product> {
    constructor(
        private root: RootService,
        private router: Router,
        private shop: ShopService,
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product> {
        const productSlug = route.params.productSlug || route.data.productSlug;

        switch(getModeSource()) {

            case 'demo.sourcing.pm':

                return this.shop.getProductHtml(productSlug).pipe(
                    catchError(error => {
                        if (error instanceof HttpErrorResponse && error.status === 404) {
                            this.router.navigate([this.root.notFound()]).then();
                        }

                        return EMPTY;
                    })
                );               break;

            default: // 'fake-server'; 'json':
                    return this.shop.getProduct(productSlug)
                    .pipe(
                        catchError(error => {
                            if (error instanceof HttpErrorResponse && error.status === 404) {
                                this.router.navigate([this.root.notFound()]).then();
                            }

                            return EMPTY;
                        })
                    );
        }



    }
}
