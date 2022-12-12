import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Product } from 'src/app/shared/interfaces/product';
// import { Product } from 'src/app/pimalion/interfaces/product';

import { Category } from 'src/app/shared/interfaces/category';

import { ShopService } from 'src/app/shared/api/shop.service';
import { CategoriesService } from 'src/app/shared/api/categories.service';
@Component({
    selector: 'app-product-sidebar',
    templateUrl: './product-sidebar.component.html',
    styleUrls: ['./product-sidebar.component.sass']
})
export class ProductSidebarComponent implements OnInit {
    categories$: Observable<Category[]>;
    bestsellers$: Observable<Product[]>;

    constructor(
        private shop: ShopService,
        private categoriesService: CategoriesService
    ) { }

    ngOnInit(): void {
        this.categories$ = this.shop.getCategories(this.categoriesService, null, 1);
        this.bestsellers$ = this.shop.getBestsellers().pipe(map(x => x.slice(0, 5)));
    }
}
