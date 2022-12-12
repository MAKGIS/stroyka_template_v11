import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Product } from '../../../../shared/interfaces/product';
import { ShopService } from '../../../../shared/api/shop.service';
import { Category } from '../../../../shared/interfaces/category';
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

    ngOnInit() {
        this.categories$ = this.shop.getCategories(this.categoriesService, null, 1);
        this.bestsellers$ = this.shop.getBestsellers().pipe(map(x => x.slice(0, 5)));
    }
}
