import { Component, OnDestroy, OnInit } from '@angular/core';
import { posts } from '../../../data/blog-posts';
import { Brand } from '../../shared/interfaces/brand';
import { Observable, Subject, merge } from 'rxjs';
import { ShopService } from '../../shared/api/shop.service';
import { Product } from '../../shared/interfaces/product';
import { Category } from '../../shared/interfaces/category';
import { BlockHeaderGroup } from '../../shared/interfaces/block-header-group';
import { takeUntil, tap } from 'rxjs/operators';


import { getCategoriesName, getCategoriesSlug, getModeSource } from 'src/fake-server/database/brands';
import { CategoriesService } from 'src/app/shared/api/categories.service';

// const mode: string = getModeSource();

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
    selector: 'app-home',
    templateUrl: './page-home-one.component.html',
    styleUrls: ['./page-home-one.component.scss']
})
export class PageHomeOneComponent implements OnInit, OnDestroy {
    destroy$: Subject<void> = new Subject<void>();
    bestsellers$: Observable<Product[]>;
    brands$: Observable<Brand[]>;
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

        this.bestsellers$ = this.shop.getBestsellers(7);

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
                    products$: this.shop.getFeaturedProducts(null, 8),
                },
                {
                    name: categories[0].name,  // getCategoriesName()[0],
                    current: false,
                    // products$: this.shop.getFeaturedProducts(getCategoriesSlug()[0], 8),
                    products$: this.shop.getFeaturedProducts(categories[0].slug, 8),
                },
                {
                    name: categories[1].name, // getCategoriesName()[1],
                    current: false,
                    // products$: this.shop.getFeaturedProducts(getCategoriesSlug()[1], 8),
                    products$: this.shop.getFeaturedProducts(categories[1].slug, 8),
                },
                {
                    name: categories[2].name, // getCategoriesName()[2],
                    current: false,
                    // products$: this.shop.getFeaturedProducts(getCategoriesSlug()[2], 8),
                    products$: this.shop.getFeaturedProducts(categories[2].slug, 8),
                },
            ],
        };

        this.groupChange(this.featuredProducts, this.featuredProducts.groups[0]);

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
                    name: categories[0].name, // getCategoriesName()[0],
                    current: false,
                    // products$: this.shop.getLatestProducts(getCategoriesSlug()[0], 8),
                    products$: this.shop.getLatestProducts(categories[0].slug, 8),
                },
                {
                    name: categories[1].name, // getCategoriesName()[1],
                    current: false,
                    // products$: this.shop.getLatestProducts(getCategoriesSlug()[1], 8),
                    products$: this.shop.getLatestProducts(categories[1].slug, 8),
                },
                {
                    name: categories[2].name, // getCategoriesName()[2],
                    current: false,
                    // products$: this.shop.getLatestProducts(getCategoriesSlug()[2], 8),
                    products$: this.shop.getLatestProducts(categories[2].slug, 8),
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
