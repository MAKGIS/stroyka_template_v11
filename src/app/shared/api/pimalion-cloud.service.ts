import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// import { Address } from './../../interfaces/address';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { Category, CategoryPimalion } from '../interfaces/category';
import { Brand, BrandPimalion } from '../interfaces/brand';
import { getCategoriesPimalion } from './products-list-pimalion';



const httpOptions = {
headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept',  'application/json')
     // , responseType: 'json'
     // , observe: 'response'
};

class CategoryItem {

    id: string;
    type: string= 'shop';
    name: string;
    slug: string;
    path: string;
    image: string = 'assets/images/logos/logo-1.png';
    items: number;
    customFields: any = {};

    constructor( id: string, name: string, slug: string, filterCount: number ) {

        this.id =  id;     // ???

        this.name = name,
        this.slug = slug,

        this.items = filterCount   // ???
    }
};

class BrandItem {

    id: string;

    name: string;
    slug: string;

    image: string = 'assets/images/logos/logo-1.png';
    items: number;

    constructor( id: string, name: string, slug: string, filterCount: number ) {

        this.id =  id;     // ???

        this.name = name,
        this.slug = slug,

        this.items = filterCount   // ???
    }
}


const isPimalionCloudServiceLog = true;

@Injectable({
  providedIn: 'root'
})
export class PimalionCloudService {

  constructor(private http: HttpClient) { }

  // 01 Post Homepage Get all categories
  getCloudCategoriesList(): Observable<Category[]> {

    const url = `${environment.pimalionCloudUrl}/api/shop/categories`;

    if (isPimalionCloudServiceLog || true) {
        console.log('PimalionCloudService.getCloudCategoriesList() -> %o ', url);
    }

      const httpOptions_cat = {
        headers: new HttpHeaders()
              .set('Content-Type', 'application/json')
              .set('Accept',  'application/json')
        };

     return this.http.get<CategoryPimalion[]>(url, httpOptions_cat)
    .pipe(

                tap((items: any) => {
                    if (isPimalionCloudServiceLog || true) {
                        console.log('*srv*** PimalionCloudService.getCloudCategoriesList() items -> %O', items);
                    }
                }),
                map(itemData => {
                    var i: number = 0;
                    return itemData.map(value => {
                        i = i + 1;
                        return new CategoryItem(i + '', value.filterValue, value.filterValue, value.filterCount);
                    })
                }),
                tap((items: any) => {
                    if (isPimalionCloudServiceLog || true) {
                        console.log('*srv*** PimalionCloudService.getCloudCategoriesList() items(Categories) -> %O', items);
                    }
                }),

                catchError((err: any): any => {
                    console.log('*srv*** Error PimalionCloudService.getCloudCategoriesList() -> %O', err);
                    return of([]);
                })
            )
    }

  // 02 Post Brands A list of brands
  getCloudBrandsList(): Observable<Brand[]> {

    const url = `${environment.pimalionCloudUrl}/api/shop/brands`;

    if (isPimalionCloudServiceLog) {
        console.log('*srv*** PimalionCloudService.getCloudBrandsList() url -> %o', url);
    }

    return this.http.get<BrandPimalion[]>( url,  httpOptions)
        .pipe(
            tap((items: any) => {
                if (isPimalionCloudServiceLog) {
                    console.log('*srv*** PimalionCloudService.getCloudBrandsList() items -> %O', items);
                }
            }),
            map(itemData => {
                var i: number = 0;
                return itemData.map(value => {
                    i = i + 1;
                    return new BrandItem(i + '', value.filterValue, value.filterValue, value.filterCount);
                })
            }),
            tap((items: any) => {
                if (isPimalionCloudServiceLog || true) {
                    console.log('*srv*** PimalionCloudService.getCloudBrandsList() items(Brands) -> %O', items);
                }
            }),

            catchError((err: any): any => {
                console.log('*srv*** Error PimalionCloudService.getCloudBrandsList() -> %O', err);
                return of([]);
            })
        );
  }

  // 03 Post Product list. All products
  getProductsList(body: any): Observable<any> {

    const url = `${environment.pimalionCloudUrl}/api/product/search`;

    if (isPimalionCloudServiceLog) {
        console.log('*srv*** PimalionCloudService.getProductsList() url -> %o  body -> %o', url, body);
    }
    if (!body) {
                    /*
                    body = {
                        groupFields: [],
                        selection: [],
                        page: 0,
                        pageSize: 12,
                        isManaged: true,
                        sort: [],
                        productStates: []
                    };
                    */
                   console.log('*srv*** Error PimalionCloudService.getProductsList() body -> NULL');
                   return of([]);
                }

    const mainHeaders = [];

    // return this.http.post<any>(`${environment.pimalionCloudUrl}/pimalion_demo2_api/api/product/search`, body, {
    return this.http.post<any>( url, body, {
            headers: new HttpHeaders()
              .set('Content-Type', 'application/json')
              .set('Accept', 'application/json')
         , responseType: 'json'
         , observe: 'response'
        })
    .pipe(
             map((response: any) => {

                if (isPimalionCloudServiceLog) {
                    console.log('*srv*** PimalionCloudService.getProductsList() response -> %O', response);
                }
                 // const keys = response.headers.keys();
                 /*
                 const headers = keys.map( key => {
                        const keyName = `${key}: ${response.headers.get(key)}`;
                        console.log('*srv*** PimalionCloudService.getProductsList() keyName -> %O', keyName);
                        mainHeaders[key] = response.headers.get(key);
                        console.log('*srv*** PimalionCloudService.getProductsList() header -> %O', response.headers.get(key));
                    }
                   );
                   */
                 // tslint:disable-next-line:no-shadowed-variable
                 const body = {
                    items: response.body.tableValues,
                    sorts: response.body.sorts,
                    total: response.headers.get('x-total-count'),
                    pages: response.headers.get('x-total-pages'),
                  };

                  if (isPimalionCloudServiceLog) {
                    console.log('*srv*** PimalionCloudService.getProductsList() body -> %O', body);
                  }
                 return body;
             }),
            catchError((err: any): any => {
                console.log('*srv*** Error PimalionCloudService.getProductsList() -> %O', err);
                return of([]);
            })
        );
    }

  // 04 Get The product detail page
  getProductDetailPage(productKey: string): Observable<any> {

    const url = `${environment.pimalionCloudUrl}/pimalion_demo2_api/api/product/render/html/${productKey}?version=web`;

    if (isPimalionCloudServiceLog) {
        console.log('*srv*** PimalionCloudService.getProductDetailPage() url -> %o', url);
    }
    // productKey = 'Ipw9LHUBUvwcyS3bkdSh';

    return this.http.get<any>( url, httpOptions)
    .pipe(
             tap((item: any) => {
                if (isPimalionCloudServiceLog) {
                    console.log('*srv*** PimalionCloudService.getProductDetailPage() items -> %O', item);
                }
             })
             ,
            catchError((err: any): any => {
                console.log('*srv*** Error PimalionCloudService.getProductDetailPage() -> %O', err);
                return of(`<html><head>Product Detail Page</head> <body>Page not found </body></html>`);
            })
        );
  }
/*
  getProducts(body: any): Observable<any> {

    const url = `${environment.pimalionCloudUrl}/api/product/search`;

    if (isPimalionCloudServiceLog) {
        console.log('*srv*** PimalionCloudService.getProductsList() url -> %o', url);
    }
    if (!body) {

                   console.log('*srv*** Error PimalionCloudService.getProductsList() body -> NULL');
                   return of([]);
                }

    const mainHeaders = [];

    return this.http.post<any>( url, body, {
            headers: new HttpHeaders()
              .set('Content-Type', 'application/json')
              .set('Accept', 'application/json')
         , responseType: 'json'
         , observe: 'response'
        })
    .pipe(
             map((response: any) => {

                if (isPimalionCloudServiceLog) {
                    console.log('*srv*** PimalionCloudService.getProductsList() response -> %O', response);
                }
                 // const keys = response.headers.keys();

                 // tslint:disable-next-line:no-shadowed-variable

                  if (isPimalionCloudServiceLog) {
                    console.log('*srv*** PimalionCloudService.getProductsList() response.body.tableValues -> %O', response.body.tableValues);
                  }
                 return response.body.tableValues;
             }),
            catchError((err: any): any => {
                console.log('*srv*** Error PimalionCloudService.getProductsList() -> %O', err);
                return of([]);
            })
        );
    }
  */
}
