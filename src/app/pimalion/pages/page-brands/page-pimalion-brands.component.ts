
import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable, Subject, merge } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import { ShopService } from 'src/app/shared/api/shop.service';

@Component({
    selector: 'app-page-pimalion-brands',
    templateUrl: './page-pimalion-brands.component.html',
    styleUrls: ['./page-pimalion-brands.component.scss']
})
export class PagePimalionBrandsComponent implements OnInit, OnDestroy {

    destroy$: Subject<void> = new Subject<void>();

    pimalionBrands$: Observable<any[]>;

    constructor(
        private shopPimalionService: ShopService,
    ) { }

    ngOnInit(): void {

        this.pimalionBrands$ = this.shopPimalionService.getPopularBrands();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

}
