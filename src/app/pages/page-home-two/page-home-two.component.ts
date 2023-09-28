import { Component, OnDestroy, OnInit } from '@angular/core';
import { posts } from '../../../data/blog-posts';
import { ShopService } from '../../shared/api/shop.service';
import { takeUntil, tap } from 'rxjs/operators';
import { merge, Observable, Subject } from 'rxjs';
import { Brand } from '../../shared/interfaces/brand';
import { Product } from '../../shared/interfaces/product';
import { Category } from '../../shared/interfaces/category';
import { BlockHeaderGroup } from '../../shared/interfaces/block-header-group';

import { getCategoriesName, getCategoriesSlug, getModeSource } from 'src/fake-server/database/brands';
import { CategoriesService } from 'src/app/shared/api/categories.service';

const mode: string = getModeSource();

interface ProductsCarouselGroup extends BlockHeaderGroup {
    products$: Observable<Product[]>;
}

interface ProductsCarouselData {
    abort$: Subject<void>;
    loading: boolean;
    products: Product[];
    groups: ProductsCarouselGroup[];
}

@Component({
    selector: 'app-page-home-two',
    templateUrl: './page-home-two.component.html',
    styleUrls: ['./page-home-two.component.scss']
})
export class PageHomeTwoComponent implements OnInit, OnDestroy {
    destroy$: Subject<void> = new Subject<void>();
    bestsellers$: Observable<Product[]>;
    brands$: Observable<Brand[]>;

    pimalionCategories$: Observable<Category[]>;
    popularCategories$: Observable<Category[]>;

    columnTopRated$: Observable<Product[]>;
    columnSpecialOffers$: Observable<Product[]>;
    columnBestsellers$: Observable<Product[]>;

    posts = posts;

    featuredProducts: ProductsCarouselData;
    latestProducts: ProductsCarouselData;

    constructor(
        private shop: ShopService,
        private categoriesService: CategoriesService
    ) { }

    ngOnInit(): void {
        this.bestsellers$ = this.shop.getBestsellers(7);  // Bestsellers - 7
        this.brands$ = this.shop.getPopularBrands();

/*
               this.popularCategories$ = this.shop.getCategoriesBySlug([
                'power-tools',
                'hand-tools',
                'machine-tools',
                'power-machinery',
                'measurement',
                'clothes-and-ppe',
            ], 1);
*/
        // mak ???
        // <ng-container> {{pimalionCategories$|async}}</ng-container>
        // this.pimalionCategories$ =  this.shop.getCategoriesList();


        const categories = this.categoriesService.CategoriesChangedSub$.getValue();
        const categoriesSlug = categories.map(x => {
            return x.slug;
        });

        switch(getModeSource()) {

            case 'demo.sourcing.pm':

                this.popularCategories$ = this.shop.getCategoriesBySlug(this.categoriesService, categoriesSlug, 1);
            break;

            default: // 'fake-server'; 'json':
                this.popularCategories$ = this.shop.getCategoriesBySlug(this.categoriesService, getCategoriesSlug(), 1);
        }

        // this.popularCategories$ = this.shop.getCategoriesBySlug(this.categoriesService, getCategoriesSlug(), 1);

        // Top Rated Products, Special Offers, Bestsellers - 3
        this.columnTopRated$ = this.shop.getTopRated(3);
        this.columnSpecialOffers$ = this.shop.getSpecialOffers(3);
        this.columnBestsellers$ = this.shop.getBestsellers(3);

        this.featuredProducts = {
            abort$: new Subject<void>(),
            loading: false,
            products: [],
            groups: [
                {
                    name: 'All',
                    current: true,
                    products$: this.shop.getFeaturedProducts(null, 10),
                },
                {
                    name: categories[0].name,  // 'Power Tools',
                    current: false,
                    // products$: this.shop.getFeaturedProducts(getCategoriesSlug()[0], 10),
                    products$: this.shop.getFeaturedProducts(categoriesSlug[0], 10),
                },
                {
                    name: categories[1].name,  // 'Hand Tools',
                    current: false,
                    // products$: this.shop.getFeaturedProducts(getCategoriesSlug()[1], 10),
                    products$: this.shop.getFeaturedProducts(categoriesSlug[1], 10),
                },
                {
                    name: categories[2].name,  // 'Plumbing',
                    current: false,
                    // products$: this.shop.getFeaturedProducts(getCategoriesSlug()[2], 10),
                    products$: this.shop.getFeaturedProducts(categoriesSlug[2], 10),
                },
            ],
        };
        this.groupChange(this.featuredProducts, this.featuredProducts.groups[0]);

        // ???
        this.latestProducts = {
            abort$: new Subject<void>(),
            loading: false,
            products: [],
            groups: [
                {
                    name: 'All',
                    current: true,
                    products$: this.shop.getLatestProducts(null, 8),
                },
                {
                    name: categories[0].name,  // getCategoriesName()[0],
                    current: false,
                    // products$: this.shop.getLatestProducts(getCategoriesSlug()[0], 8),
                    products$: this.shop.getLatestProducts(categoriesSlug[0], 8),
                },
                {
                    name: categories[1].name,  // getCategoriesName()[1],
                    current: false,
                    // products$: this.shop.getLatestProducts(getCategoriesSlug()[1], 8),
                    products$: this.shop.getLatestProducts(categoriesSlug[0], 8),
                },
                {
                    name: categories[2].name,  // getCategoriesName()[2], //'Plumbing',
                    current: false,
                    // products$: this.shop.getLatestProducts(getCategoriesSlug()[2], 8),
                    products$: this.shop.getLatestProducts(categoriesSlug[0], 8),
                },
            ],
        };
        this.groupChange(this.latestProducts, this.latestProducts.groups[0]);
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    groupChange(carousel: ProductsCarouselData, group: BlockHeaderGroup): void {
        carousel.loading = true;
        carousel.abort$.next();

        (group as ProductsCarouselGroup).products$.pipe(
            tap(() => carousel.loading = false),
            takeUntil(merge(this.destroy$, carousel.abort$)),
        ).subscribe(x => carousel.products = x);
    }
}
