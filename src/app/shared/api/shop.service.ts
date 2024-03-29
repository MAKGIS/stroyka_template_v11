import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { delay, filter, find, map, switchMap, tap } from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Category } from '../interfaces/category';
import { Brand } from '../interfaces/brand';
import { Product } from '../interfaces/product';
import { ProductsList } from '../interfaces/list';
import { Filter, SerializedFilterValues } from '../interfaces/filter';
import {
    getBestsellers,
    getFeatured,
    getLatestProducts,
    getProduct,
    getRelatedProducts,
    getSpecialOffers,
    getTopRated,
    getShopCategoriesBySlugs,
    getShopCategoriesTree,
    getShopCategory,
    getBrands,
    getProductsList,
} from '../../../fake-server';
import { getSuggestions } from 'src/fake-server/database/products';


// https://demo.sourcing.pm/backend/swagger/ui/index#/Shop


import {
    // getCategoriesPimalion,
    // getBrandsPimalion,
    // getProductHtmlPimalion,

    getProductsListPimalion,
    getProductsPimalion,

    // getCategyPimalion,
} from './products-list-pimalion';

import { getModeSource } from 'src/fake-server/database/brands';

import { PimalionCloudService } from './pimalion-cloud.service';


import { CategoriesService } from './categories.service';
import { BrandsService } from './brands.service';
import { IFilterOption } from './filter-option.service';

// [{"key": "brandName.keyword", "value": "NICOLL"}]
export interface FilterValue {
    key: string;
    value: string;
}

export interface ListOptions {
    query?: string;
    page?: number;
    limit?: number;
    sort?: string;
    filterValues?: SerializedFilterValues;
    filtersBrand?: FilterValue[];
}

const delayTest = 0;
const isShopServiceLog = true;

// 'demo.sourcing.pm'; // 'demo.sourcing.pm';  'fake-server', 'json'
// const mode: string = getModeSource();

// Set the http options
const httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
};
@Injectable({
    providedIn: 'root'
})
export class ShopService {

    constructor(
        private http: HttpClient,
        private pimalionCloudService: PimalionCloudService,
        private brandsService: BrandsService,
        private categoriesService: CategoriesService
    ) { }


    /**
     * Returns popular brands.
     */
     getPopularBrands(): Observable<Brand[]> {
        /**
         * This is what your API endpoint might look like:
         *
         * https://example.com/api/shop/brands/popular.json
         */
        // return this.http.get<Brand[]>('https://example.com/api/shop/brands/popular.json');

        // This is for demonstration purposes only. Remove it and use the code above.

        switch (getModeSource()) {

            case 'fake-server':

                return getBrands();
                break;
            case 'json':

                return this.http.get<Brand[]>('assets/api/brands/brands.json')
                .pipe(
                   tap( n=>
                    {
                        if (isShopServiceLog)  {
                            console.log('- srv -- ShopService.getPopularBrands() Brands -> %o', n);
                        }
                    }),
                   delay(delayTest)
               );
               break;

            case 'demo.sourcing.pm':

                return this.pimalionCloudService.getCloudBrandsList(this.brandsService);

                break;

             default:

                return getBrands();
          }
    }

    getCategoriesList(): Observable<Category[]> {
        /**
         * This is what your API endpoint might look like:
         *
         * https://example.com/api/shop/categories/popular.json
         */
        // return this.http.get<Brand[]>('https://example.com/api/shop/categories/popular.json');

        // This is for demonstration purposes only. Remove it and use the code above.

        switch (getModeSource()) {

            case 'fake-server':

              return of([]);
              break;

            case 'json':

                return this.http.get<Category[]>('assets/api/categories/categories.json')
                .pipe(
                   tap( data =>
                    {
                        if (isShopServiceLog)  {
                            console.log('- srv -- ShopService.getCategoriesList() data -> %o', data)
                        }
                    }),
                   delay(delayTest)
               );
            break;

            case 'demo.sourcing.pm':

                return this.pimalionCloudService.getCloudCategoriesList(this.categoriesService);

                break;
             default:

                return of([]);
          }
    }

    /**
     * Returns category object by slug.
     *
     * @param slug - Unique human-readable category identifier.
     */
    getCategory(slug: string): Observable<Category> {
        /**
         * This is what your API endpoint might look like:
         *
         * https://example.com/api/shop/categories/power-tools.json
         *
         * where:
         * - power-tools = slug
         */
        // return this.http.get<Category>(`https://example.com/api/shop/categories/${slug}.json`);

        // This is for demonstration purposes only. Remove it and use the code above.

        if (isShopServiceLog)  {console.log('- srv -- ShopService.getCategory() slug -> %o', slug)}

        switch (getModeSource()) {

            case 'fake-server':

                return getShopCategory(slug);
                break;
            case 'json':

                return this.http.get<Category>(`assets/api/categories/category_1.json`)
                .pipe(
                    tap( n=>
                        {
                        if (isShopServiceLog)  {console.log('- srv -- ShopService.getCategory()  delayTest -> %o', delayTest)}
                    }),
                    delay(delayTest)
                );
                break;

            case 'demo.sourcing.pm':

              return  this.getCategoriesList()
                .pipe(
                    tap( data => {
                        if (isShopServiceLog)  {
                           console.log('- srv -- ShopService.getCategory() data -> %o   slug -> %o', data, slug);
                        }
                    }),
                    find((data: any) => data.slug === slug),
                    tap( data => {
                        if (isShopServiceLog)  {
                            console.log('- srv -- ShopService.getCategory() data(Category) -> %o   slug -> %o', data, slug);
                        }
                    }),
                );

                break;
             default:

                return getShopCategory(slug);
          }
    }

    /**
     * Returns a category tree.
     *
     * @param parent - If a parent is specified then its descendants will be returned.
     * @param depth  - Maximum depth of category tree.
     */
    getCategories(categoriesService: CategoriesService, parent: Partial<Category> = null, depth: number = 0): Observable<Category[]> {
        /**
         * This is what your API endpoint might look like:
         *
         * https://example.com/api/shop/categories.json?parent=latest-news&depth=1
         *
         * where:
         * - parent = parent.slug
         * - depth  = depth
         */
        // const params: {[param: string]: string} = {
        //     parent: parent.slug,
        //     depth: depth.toString(),
        // };
        //
        // return this.http.get<Category[]>('https://example.com/api/shop/categories.json', {params});

        // This is for demonstration purposes only. Remove it and use the code above.
        // return getShopCategoriesTree(parent ? parent.slug : null, depth);

        if (isShopServiceLog)  {console.log('- srv -- ShopService.getCategories() parent -> %o  depth -> %o', parent, depth)}

        switch (getModeSource()) {

            case 'fake-server':

                return getShopCategoriesTree(parent ? parent.slug : null, depth);
                break;
            case 'json':

                return this.http.get<Category[]>('assets/api/categories/categories.json')
                .pipe(
                    tap( n=>
                        {
                            if (isShopServiceLog)  {console.log('- srv -- ShopService  delayTest -> %o', delayTest)}
                    }),
                    delay(delayTest)
                );
                break;
            case 'demo.sourcing.pm':

                return this.pimalionCloudService.getCloudCategoriesList(this.categoriesService);

                break;

             default:

                return getShopCategoriesTree(parent ? parent.slug : null, depth);
          }
    }

    /**
     * Returns an array of the specified categories.
     *
     * @param slugs - Array of slugs.
     * @param depth - Maximum depth of category tree.
     */
    getCategoriesBySlug(categoriesService: CategoriesService, slugs: string[], depth: number = 0): Observable<Category[]> {
        /**
         * This is what your API endpoint might look like:
         *
         * https://example.com/api/shop/categories.json?slugs=power-tools,measurement&depth=1
         *
         * where:
         * - slugs = slugs.join(',')
         * - depth = depth
         */
        // const params: {[param: string]: string} = {
        //     slugs: slugs.join(','),
        //     depth: depth.toString(),
        // };
        //
        // return this.http.get<Category[]>('https://example.com/api/shop/categories.json', {params});

        // This is for demonstration purposes only. Remove it and use the code above.

        switch (getModeSource()) {

            case 'fake-server':

                return getShopCategoriesBySlugs(slugs, depth);
                break;
            case 'json':

                return this.http.get<Category[]>('assets/api/categories/categories.json')
                .pipe(
                   tap( n=>
                    {
                        if (isShopServiceLog)  {console.log('- srv -- ShopService  delayTest -> %o', delayTest)}
                    }),
                   delay(delayTest)
               );
               break;

            case 'demo.sourcing.pm':

                return this.pimalionCloudService.getCloudCategoriesList(this.categoriesService);

             default:

                return getShopCategoriesBySlugs(slugs, depth);
          }
    }

    /**
     * Returns paginated products list.
     * If categorySlug is null then a list of all products should be returned.
     *
     * @param categorySlug         - Unique human-readable category identifier.
     * @param options              - Options.
     * @param options.page         - Page number (optional).
     * @param options.limit        - Maximum number of items returned at one time (optional).
     * @param options.sort         - The algorithm by which the list should be sorted (optional).
     * @param options.filterValues - An object whose keys are filter slugs and values ​​are filter values (optional).
     */
    getProductsList(categorySlug: string|null, options: ListOptions): Observable<ProductsList> {
        /**
         * This is what your API endpoint might look like:
         *
         * https://example.com/api/products.json?category=screwdriwers&page=2&limit=12&sort=name_desc&filter_price=500-1000
         *
         * where:
         * - category     = categorySlug
         * - page         = options.page
         * - limit        = options.limit
         * - sort         = options.sort
         * - filter_price = options.filterValues.price
         */
        // const params: {[param: string]: string} = {};
        //
        // if (categorySlug) {
        //     params.category = categorySlug;
        // }
        // if ('page' in options) {
        //     params.page = options.page.toString();
        // }
        // if ('limit' in options) {
        //     params.limit = options.limit.toString();
        // }
        // if ('sort' in options) {
        //     params.sort = options.sort;
        // }
        // if ('filterValues' in options) {
        //     Object.keys(options.filterValues).forEach(slug => params[`filter_${slug}`] = options.filterValues[slug]);
        // }
        //
        // return this.http.get<ProductsList>('https://example.com/api/products.json', {params});

        // This is for demonstration purposes only. Remove it and use the code above.

        if (isShopServiceLog)  {
            console.log('- srv -- ShopService.getProductsList()  categorySlug -> %o', categorySlug);
            console.log('- srv -- ShopService.getProductsList()  options -> %o', options);
        }

            switch (getModeSource()) {

                case 'fake-server':

                     return getProductsList(categorySlug, options);
                     break;
                case 'json':

                      // ???
                    return this.http.get<ProductsList>('assets/api/products/productslist.json')
                    .pipe(
                    tap( n=>
                        {
                            if (isShopServiceLog)  {console.log('- srv -- ShopService  delayTest -> %o', delayTest)}
                        }),
                    delay(delayTest)
                    );
                    break;
                case 'demo.sourcing.pm':

                    const pagePimalion = options.page  || 1 ;
                    const limitPimalion = options.limit || 12;
                    // const sort = options.sort || 'default';
                    const filters = options.filtersBrand || [];
                    // filterValues: {brand: 'NICOLL,HAGER'}

                    var categoryFilters =  categorySlug === null ? [] : [{'key': 'Categories', 'value': categorySlug }];

                    const body = {
                       // groupFields: [],
                       // selection: [],

                       // filters: [{'key': 'Marques', 'value': 'NICOLL'}],
                       // mak ???
                        // let result = condition ? value1 : value2;

                        filters: filters.length == 0 ? categoryFilters :  categoryFilters.concat([filters[0]]),  // filters, ???                        // sort: [],  // ???
                        // sort: [],  // ???

                        page: pagePimalion - 1,  // !!! ???
                        pageSize: limitPimalion

                      //  productStates: []
                    };
                    if (isShopServiceLog)  {
                        console.log(`- srv -- ShopService.getProductsList() body -> %O`, body);
                     }
                    return this.pimalionCloudService.getProductsList(body, this.brandsService)
                        .pipe(
                            switchMap(pimalionBody => {

                                if (isShopServiceLog)  {
                                    console.log(`- srv -- ShopService.getProductsList() Input categorySlug -> %O options -> %O`, categorySlug, options);
                                    console.log(`- srv -- ShopService.getProductsList() Input pimalionBody -> %O`, pimalionBody);
                                }
                                const productsList = getProductsListPimalion(this.categoriesService, this.brandsService,
                                                categorySlug, options, pimalionBody);

                                return productsList;
                            })
                        );
                        break;
                 default:

                    return getProductsList(categorySlug, options);
              }
    }

    getTypeProducts(categorySlug: string|null, options: ListOptions,  count: number ): Observable<Product[]> {


        const pagePimalion = options.page  || 1 ;
        const limitPimalion = options.limit || count;
        const sort = options.sort || [];
        const query = options.query || '';

        const filters = options.filtersBrand || [];

        // categorySlug ???
        var categoryFilters =  categorySlug === null ? [] : [{'key': 'Categories', 'value': categorySlug }];

       const body = {
                //groupFields: [],
                //selection: [],

                // filters: [{'key': 'Marques', 'value': 'NICOLL'}],
                // mak ???
                // let result = condition ? value1 : value2;
                filters: filters.length == 0 ? categoryFilters :  categoryFilters.concat([filters[0]]),  // filters, ???

                page: pagePimalion - 1,  // !!! ???
                pageSize: limitPimalion,
                //isManaged: true,
                //sort: sort,                  // options.sort
                //productStates: []
            };

        if (query  != '') {
                body["query"] = query;
            };

            if (isShopServiceLog)  {
                console.log(`- srv -- ShopService.getTypeProducts() body -> %O`, body);
             }

        return this.pimalionCloudService.getProductsList(body, this.brandsService)
            .pipe(
                switchMap(productsBody => {

                    if (isShopServiceLog)  {
                      //  console.log(`- srv -- ShopService.getTypeProducts().getProducts() Input categorySlug -> %O options -> %O`, categorySlug, options);
                      //  console.log(`- srv -- ShopService.getTypeProducts().getProducts() Input products -> %O`, productsBody);
                    }
                    const productsPimalion = getProductsPimalion(categorySlug, options, productsBody);

                    if (isShopServiceLog)  {
                       // console.log(`- srv -- ShopService.getTypeProducts().getProducts() Output productsPimalion -> %O`, productsPimalion);
                    }

                    return productsPimalion;
                })
            );

    }

    getProduct(productSlug: string): Observable<Product> {
        /**
         * This is what your API endpoint might look like:
         *
         * https://example.com/api/products/electric-planer-brandix-kl370090g-300-watts.json
         *
         * where:
         * - electric-planer-brandix-kl370090g-300-watts = productSlug
         */
        // return this.http.get<Product>(`https://example.com/api/products/${productSlug}.json`);

        // This is for demonstration purposes only. Remove it and use the code above.

        switch (getModeSource()) {

            case 'fake-server':

                 return getProduct(productSlug);
                 break;
            case 'json':

                return this.http.get<Product>(`assets/api/products/product_1.json`)
                .pipe(
                   tap( n=>
                    {
                        if (isShopServiceLog)  {console.log('- srv -- ShopService  delayTest -> %o', delayTest)}
                    }),
                   delay(delayTest)
               );
               break;
            case 'demo.sourcing.pm':

                const product = getProduct(productSlug);

                return product.pipe(
                    tap(data=> {
                        if (isShopServiceLog)  {
                            console.log('- srv -- ShopService.getProduct() Input  productSlug -> %O ', productSlug);
                            console.log('- srv -- ShopService.getProduct() Output product -> %O', data);
                        }
                    })
                );
                break;
             default:

                return getProduct(productSlug);
          }
    }

    getProductHtml(productId: string): Observable<Product> {
        /**
         * This is what your API endpoint might look like:
         *
         * https://example.com/api/products/electric-planer-brandix-kl370090g-300-watts.json
         *
         * where:
         * - electric-planer-brandix-kl370090g-300-watts = productSlug
         */
        // return this.http.get<Product>(`https://example.com/api/products/${productSlug}.json`);

        // This is for demonstration purposes only. Remove it and use the code above.

        switch (getModeSource()) {

            case 'fake-server':

               // ???
               break;
            case 'json':

                // ???
                break;
            case 'demo.sourcing.pm':

                return this.pimalionCloudService.getProductDetailPage(productId)
                .pipe(
                    /*
                    switchMap(pimalionItemHtml => {

                        if (isShopServiceLog)  {
                            console.log(`- srv --  ShopService.getProduct() Input productId -> %O`, productId);
                            // console.log(`- srv --  ShopService.getProduct() Input pimalionItemHtml-> %O`, pimalionItemHtml);
                        }
                        const productCor = getProductHtmlPimalion(productId, pimalionItemHtml);

                        return productCor;
                    })
                    */
                );
                break;
             default:

              // ???
          }

    }


    getBestsellers(limit: number = null): Observable<Product[]> {
        /**
         * This is what your API endpoint might look like:
         *
         * https://example.com/api/shop/products/bestsellers.json?limit=3
         *
         * where:
         * - limit = limit
         */
        // const params: {[param: string]: string} = {};
        //
        // if (limit) {
        //     params.limit = limit.toString();
        // }
        //
        // return this.http.get<Product[]>('https://example.com/api/shop/products/bestsellers.json', {params});

        // This is for demonstration purposes only. Remove it and use the code above.

        switch (getModeSource()) {

            case 'fake-server':

                return getBestsellers(limit);
                break;
            case 'json':

                return this.http.get<Product[]>('assets/api/products/bestsellers.json')
                .pipe(
                   tap( n=>
                    {
                        if (isShopServiceLog)  {console.log('- srv -- ShopService  delayTest -> %o', delayTest)}
                    }),
                   delay(delayTest)
               );
               break;
            case 'demo.sourcing.pm':

                if (isShopServiceLog)  {console.log('- srv -- ShopService.getBestsellers()')}

                const options:ListOptions = {
                   page: 0,
                   limit: limit,
                   sort: 'default'
                };
                return this.getTypeProducts(null, options, 12);

                break;
             default:

                return getBestsellers(limit);
          }
    }

    getTopRated(limit: number = null): Observable<Product[]> {
        /**
         * This is what your API endpoint might look like:
         *
         * https://example.com/api/shop/products/top-rated.json?limit=3
         *
         * where:
         * - limit = limit
         */
        // const params: {[param: string]: string} = {};
        //
        // if (limit) {
        //     params.limit = limit.toString();
        // }
        //
        // return this.http.get<Product[]>('https://example.com/api/shop/products/top-rated.json', {params});

        // This is for demonstration purposes only. Remove it and use the code above.

        switch (getModeSource()) {

            case 'fake-server':

                return getTopRated(limit);
                break;
            case 'json':

                return this.http.get<Product[]>('assets/api/products/top-rated.json')
                .pipe(
                   tap( n=>
                    {
                        if (isShopServiceLog)  {console.log('- srv -- ShopService  delayTest -> %o', delayTest)}
                    }),
                   delay(delayTest)
               );

               break;
            case 'demo.sourcing.pm':

                if (isShopServiceLog)  {console.log('- srv -- ShopService.getTopRated() ')}

                const options:ListOptions = {
                   page: 0,
                   limit: limit,
                   sort: 'default'
                };
                return this.getTypeProducts(null, options, 12);

                break;
             default:

                return getTopRated(limit);
          }
    }

    getSpecialOffers(limit: number = null): Observable<Product[]> {
        /**
         * This is what your API endpoint might look like:
         *
         * https://example.com/api/shop/products/special-offers.json?limit=3
         *
         * where:
         * - limit = limit
         */
        // const params: {[param: string]: string} = {};
        //
        // if (limit) {
        //     params.limit = limit.toString();
        // }
        //
        // return this.http.get<Product[]>('https://example.com/api/shop/products/special-offers.json', {params});

        // This is for demonstration purposes only. Remove it and use the code above.

        switch (getModeSource()) {

            case 'fake-server':

                return getSpecialOffers(limit);
                break;
            case 'json':

                return this.http.get<Product[]>('assets/api/products/special-offers.json')
                .pipe(
                   tap( n=>
                    {
                        if (isShopServiceLog)  {console.log('- srv -- ShopService  delayTest -> %o', delayTest)}
                    }),
                   delay(delayTest)
               );
               break;
            case 'demo.sourcing.pm':

                if (isShopServiceLog)  {console.log('- srv -- ShopService.getSpecialOffers()')}

                const options:ListOptions = {
                   page: 0,
                   limit: limit,
                   sort: 'default'
                };
                return this.getTypeProducts(null, options, 12);
                break;

             default:

                return getSpecialOffers(limit);
          }
    }

    getFeaturedProducts(categorySlug: string = null, limit: number = null): Observable<Product[]> {
        /**
         * This is what your API endpoint might look like:
         *
         * https://example.com/api/shop/products/featured.json?category=screwdrivers&limit=3
         *
         * where:
         * - category = categorySlug
         * - limit    = limit
         */
        // const params: {[param: string]: string} = {};
        //
        // if (category) {
        //     params.category = category;
        // }
        // if (limit) {
        //     params.limit = limit.toString();
        // }
        //
        // return this.http.get<Product[]>('https://example.com/api/shop/products/featured.json', {params});

        // This is for demonstration purposes only. Remove it and use the code above.

        switch (getModeSource()) {

            case 'fake-server':

                return getFeatured(categorySlug, limit);
                break;
            case 'json':

                return this.http.get<Product[]>('assets/api/products/featured.json')
                .pipe(
                   tap( n=>
                       {
                           if (isShopServiceLog)  {console.log('- srv -- ShopService  delayTest -> %o', delayTest)}
                       }),
                       delay(delayTest)
               );
               break;
            case 'demo.sourcing.pm':

                if (isShopServiceLog)  {console.log('- srv -- ShopService.getFeaturedProducts()')}

                const options:ListOptions = {
                   page: 0,
                   limit: limit,
                   sort: 'default'
                };
                return this.getTypeProducts(categorySlug, options, 12);
                break;
             default:

                return getFeatured(categorySlug, limit);
          }
    }

    getLatestProducts(categorySlug: string = null, limit: number = null): Observable<Product[]> {
        /**
         * This is what your API endpoint might look like:
         *
         * https://example.com/api/shop/products/latest.json?category=screwdrivers&limit=3
         *
         * where:
         * - category = categorySlug
         * - limit    = limit
         */
        // const params: {[param: string]: string} = {};
        //
        // if (category) {
        //     params.category = category;
        // }
        // if (limit) {
        //     params.limit = limit.toString();
        // }
        //
        // return this.http.get<Product[]>('https://example.com/api/shop/products/latest.json', {params});

        // This is for demonstration purposes only. Remove it and use the code above.


        switch (getModeSource()) {

            case 'fake-server':

                return getLatestProducts(categorySlug, limit);
                break;
            case 'json':

                return this.http.get<Product[]>('assets/api/products/latest.json')
                .pipe(
                   tap( n=>
                    {
                        if (isShopServiceLog)  {console.log('- srv -- ShopService  delayTest -> %o', delayTest)}
                    }),
                   delay(delayTest)
               );
               break;
            case 'demo.sourcing.pm':

                if (isShopServiceLog)  {console.log('- srv -- ShopService.getLatestProducts() ')}

                const options:ListOptions = {
                   page: 0,
                   limit: limit,
                   sort: 'default'
                };
                return this.getTypeProducts(categorySlug, options, 12);
             default:

                return getLatestProducts(categorySlug, limit);
          }
 }

    getRelatedProducts(product: Partial<Product>): Observable<Product[]> {
        /**
         * This is what your API endpoint might look like:
         *
         * https://example.com/api/shop/products/related.json?for=water-tap
         *
         * where:
         * - for = product.slug
         */
        // const params: {[param: string]: string} = {
        //     for: product.slug,
        // };
        //
        // return this.http.get<Product[]>('https://example.com/api/shop/products/related.json', {params});

        // This is for demonstration purposes only. Remove it and use the code above.
        const limit = 8;  // ???

        switch (getModeSource()) {

            case 'fake-server':

                return getRelatedProducts(product);
                break;
            case 'json':

                return this.http.get<Product[]>('assets/api/products/related.json')
                .pipe(
                   tap( n=>
                    {
                        if (isShopServiceLog)  {console.log('- srv -- ShopService  delayTest -> %o', delayTest)}
                    }),
                   delay(delayTest)
               );
               break;
            case 'demo.sourcing.pm':

                if (isShopServiceLog)  {console.log('- srv -- ShopService.getRelatedProducts()')}

                const options:ListOptions = {
                   page: 0,
                   limit: limit, // ???
                   sort: 'default'
                };
                return this.getTypeProducts(null, options, 12);

                break;
             default:

                return getRelatedProducts(product);
          }
    }

    getSuggestions(query: string, limit: number, categorySlug: string = null, filterOption: IFilterOption ): Observable<Product[]> {
        /*
         * This is what your API endpoint might look like:
         *
         * https://example.com/api/search/suggestions.json?query=screwdriver&limit=5&category=power-tools
         *
         * where:
         * - query = query
         * - limit = limit
         * - category = categorySlug
         */
        // const params: {[param: string]: string} = {query, limit: limit.toString()};
        //
        // if (categorySlug) {
        //     params.category = categorySlug;
        // }
        //
        // return this.http.get<Product[]>('https://example.com/api/search/suggestions.json', {params});

        // This is for demonstration purposes only. Remove it and use the code above.

        if (isShopServiceLog)  {console.log('- srv -- ShopService.getSuggestions() filterOption ->%o', filterOption)}


        switch (getModeSource()) {

            case 'fake-server':

                return getSuggestions(query, limit, categorySlug);
                break;
            case 'json':

                return this.http.get<Product[]>('assets/api/products/suggestions.json')
                .pipe(
                   tap( n=>
                    {
                        if (isShopServiceLog)  {console.log('- srv -- ShopService  delayTest -> %o', delayTest)}
                    }),
                   delay(delayTest)
               );
               break;
            case 'demo.sourcing.pm':
/*
	"query": "INTER AUTO 2 FILS MG",
	"groupFields": [],
	"selection": [],
	"page": 0,
	"pageSize": 5,
	"sort": []
}

*/
                const filtersBrand = filterOption.filtersBrand || [];

                const options: ListOptions = {
                   // mak ???
                   // let result = condition ? value1 : value2;
                   filtersBrand: filtersBrand.length == 0 ? [] :  [filtersBrand[0]],  // filters, ???
                   query: query, // 'INTER AUTO 2 FILS MG',
                   page: 0,
                   limit: limit,
                   // sort: []
                };

                if (isShopServiceLog)  {console.log('- srv -- ShopService.getSuggestions() options ->%o', options)}

                return this.getTypeProducts(null, options, 5);
                break;
             default:

                return getSuggestions(query, limit, categorySlug);
          }
    }
}


