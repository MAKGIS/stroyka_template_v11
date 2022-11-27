
import { Component, OnDestroy, OnInit } from '@angular/core';


import { Observable, Subject, merge } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

// import { ShopService } from '../../../shared/api/shop.service';
import { ShopService } from 'src/app/shared/api/shop.service';
import { Category } from 'src/app/shared/interfaces/category';

// import { Product } from '../../../shared/interfaces/product';
// import { posts } from '../../../../data/blog-posts';
// import { Category } from '../../../shared/interfaces/category';
import { Brand } from '../../../shared/interfaces/brand';

// import { BlockHeaderGroup } from '../../../shared/interfaces/block-header-group';




@Component({
    selector: 'app-page-pimalion-categories',
    templateUrl: './page-pimalion-categories.component.html',
    styleUrls: ['./page-pimalion-categories.component.scss']
})
export class PagePimalionCategoriesComponent implements OnInit, OnDestroy {

    destroy$: Subject<void> = new Subject<void>();

    brands$: Observable<Brand[]>;
    // popularCategories$: Observable<Category[]>;

    pimalionCategories$: Observable<Category[]>;


    constructor(
        private shopPimalionService: ShopService,
    ) { }

    ngOnInit(): void {

        // console.log("------ PagePimalionCategoriesComponent --------");

        this.brands$ = this.shopPimalionService.getPopularBrands();

        // const body = {}

        this.pimalionCategories$ =  this.shopPimalionService.getCategoriesList();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

}
