import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// import { Address } from './../../interfaces/address';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { Category, CategoryPimalion } from '../interfaces/category';
import { Brand, BrandPimalion } from '../interfaces/brand';
import { getCategoriesPimalion } from './products-list-pimalion';
import { Product, ProductAttribute, ProductDocument } from '../interfaces/product';
import { CustomFields } from '../interfaces/custom-fields';



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

/*

{
        id: ++lastProductId + '',  // ???
        name: productDef.name,
        sku: '83690/32',
        slug: productDef.slug,
        price: productDef.price,
        compareAtPrice: productDef.compareAtPrice || null,
        images: productDef.images.slice(),
        badges: badges.slice(),
        rating: productDef.rating,
        reviews: productDef.reviews,
        availability: productDef.availability,
        brand: brands.find(x => x.slug === productDef.brand) || null,
        categories,
        attributes,
        customFields: {},
    };

       const productCor: Product = {
             id: item.id,
             slug: getPimalionValue(item.values, 'Marque'),
             name: item.label,
             sku:  getPimalionValue(item.values, 'sku'),
             price: getPimalionValue(item.attributes, 'commerce'), // item.attributes['commerce'].value,
             compareAtPrice: 0,
             images: [item.thumbnailUrl],
             badges: ['hot'],                         // badges:  ['sale', 'hot', 'new']
             rating: 1,
             reviews: 888,
             availability: 'availability',                          // item.attributes['fabdis'].value,              // доступность
             brand: brandCor,                                       // item.values['Marque'].value,
             categories: [categoryCor],
             attributes: [],
             customFields: {},

             pimalionReviews: getPimalionValue(item.values, 'Images').label + ' images / ' + getPimalionValue(item.values, 'Documents') + ' documents'
         };
*/

export class ProductItem {

    id: string;
    slug: string;
    name: string;

    sku: string;   // '83690/32',
    price: number;
    compareAtPrice: number|null;

    images: string[];
    badges: string[];

    rating: number;
    reviews: number;
    availability: string;

    brand: Brand|null;
    categories: Category[];

    attributes: ProductAttribute[];
    customFields: CustomFields;

    overview: string;

    brandName?: string;
    supplierReference?: string;

    description?: string;

    documents?: ProductDocument[];
    /*
    [
        {
            "url": "http://docdif.fr.grpleg.com/general/CESSION/AR/NP-FT-GT/50977_LE06809AA[1].pdf",
            "priority": 1,
            "label": "NOTICE (Lien http)  (Lien http)  (Lien http)  (Lien http)  (Lien http) "
        }, .. ]
    */
    // pimalionReviews?: string;   // ???

    // pimalionHtml?: string;   // ???

    relatedProducts?: any[];
    productVariants?: any[];
/*
{
    "id": "ReMSlWcBq_r5-pCSVC-G",
    "title": "PRISE TV SIMPLE COMPLET BL",
    "overview": "Arnould - PRISE TV SIMPLE COMPLET BL",
    "price": "0.0",
    "brandName": "ARNOULD",
    "supplierReference": "50977",
    "pimSku": "100501957",
    "images": [],
    "documents": [
        {
            "url": "http://docdif.fr.grpleg.com/general/CESSION/AR/NP-FT-GT/50977_LE06809AA[1].pdf",
            "priority": 1,
            "label": "NOTICE (Lien http)  (Lien http)  (Lien http)  (Lien http)  (Lien http) "
        },
        {
            "url": "http://docdif.fr.grpleg.com/general/cession/AR/NP-FT-GT/LE06809AC.pdf",
            "priority": 2,
            "label": "NOTICE (Lien http)  (Lien http)  (Lien http)  (Lien http)  (Lien http) "
        }
    ],
    "description": "",
    "attributes": [],
    "relatedProducts": [],
    "productVariants": []
}
*/
/*
            id: item.id,
             slug: getPimalionValue(item.values, 'Marque'),
             name: item.label,
             sku:  getPimalionValue(item.values, 'sku'),
             price: getPimalionValue(item.attributes, 'commerce'), // item.attributes['commerce'].value,
             compareAtPrice: 0,
             images: [item.thumbnailUrl],
             badges: ['hot'],                         // badges:  ['sale', 'hot', 'new']
             rating: 1,
             reviews: 888,
             availability: 'availability',                          // item.attributes['fabdis'].value,              // доступность
             brand: brandCor,                                       // item.values['Marque'].value,
             categories: [categoryCor],
             attributes: [],
             customFields: {},

             pimalionReviews: getPimalionValue(item.values, 'Images').label + ' images / ' + getPimalionValue(item.values, 'Documents') + ' documents'

*/
    constructor( itemData: any ) {

        this.id =  itemData.id;     // "ReMSlWcBq_r5-pCSVC-G",
        this.slug = itemData.id;    // "ReMSlWcBq_r5-pCSVC-G",
        this.name = itemData.title;  // "PRISE TV SIMPLE COMPLET BL",

        this.sku = itemData.pimSku;  // "100501957"  '83690/32',

        this.price = itemData.price; // + 1;      // "price": "0.0",
        this.compareAtPrice = itemData.price; // + 2;   //  number|null;

        const imagesTest: string[] = itemData.images.length === 0 ? [
            "assets/images/products/product-1.jpg",
            "assets/images/products/product-1-1.jpg"
        ] // test
         : itemData.images;

        this.images = imagesTest;


        this.badges = ['hot']; // badges: string[];

        this.rating = 2; // rating: number;
        this.reviews = 3; // reviews: number;
        this.availability = 'availability'; // availability: string;

        this.brand = { id: '1', name: itemData.brandName, slug: itemData.brandName, image: 'assets/images/logos/logo-1.png'};

        this.categories = [{ id:'1', name: 'Sanitaire', slug: 'Sanitaire', items: 111 , path: 'category', image: null, type: 'shop', customFields: {},
                parents: null,
                children: null
            }];
/*
const categoryCor: Category = {
             id: 1 + '',
             type: 'shop',
             name: 'name category',
             slug: 'category',
             path: 'category',
             image: null,
             items: 11,
             customFields: {},
             parents: null,
             children: null
         };
*/
        // ???
        this.attributes = []; //itemData.attributes; // attributes: ProductAttribute[];

        this.customFields = {}; // null;// customFields: CustomFields;

        this.overview = itemData.overview; // overview: string;   // "Arnould - PRISE TV SIMPLE COMPLET BL",

        this.brandName = itemData.brandName; // "brandName": "ARNOULD",
        this.supplierReference = itemData.supplierReference;   //   "supplierReference": "50977",

        // product__features

        this.documents = itemData.documents;

        this.description = itemData.description;
        // ???
        this.relatedProducts = itemData.relatedProducts;    // any[];
        this.productVariants = itemData.productVariants;    // any[];
        //???
        // this.pimalionReviews = getPimalionValue(item.values, 'Images').label + ' images / ' + getPimalionValue(item.values, 'Documents') + ' documents'

    }
};

const isPimalionCloudServiceLog = true;

@Injectable({
  providedIn: 'root'
})
export class PimalionCloudService {

  constructor(private http: HttpClient) { }

  // 01 Post Homepage Get all categories
  getCloudCategoriesList(): Observable<Category[]> {

    const url = `${environment.pimalionCloudUrl}/api/shop/categories`;

    if (isPimalionCloudServiceLog) {
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
                    if (isPimalionCloudServiceLog) {
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
                    if (isPimalionCloudServiceLog) {
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
                if (isPimalionCloudServiceLog) {
                    console.log('*srv*** PimalionCloudService.getCloudBrandsList() items(Brands) -> %O', items);
                }
            }),

            catchError((err: any): any => {
                console.log('*srv*** Error PimalionCloudService.getCloudBrandsList() -> %O', err);
                return of([]);
            })
        );
  }

  // 03 Post /api/shop/search Product list. All products
  getProductsList(body: any): Observable<any> {

    const url = `${environment.pimalionCloudUrl}/api/shop/search`;

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
// ???
             const   bodyQuery = {
                        query : "vis",
                        groupFields: [],
                        selection: [],
                        page: body.page,
                        pageSize: body.pageSize,
                        isManaged: true,
                        sort: [],
                        productStates: []
                    };
         body = bodyQuery;

    if (isPimalionCloudServiceLog) {
        console.log('*srv*** PimalionCloudService.getProductsList() url -> %o  body -> %o', url, body);
    }

    const mainHeaders = [];

    return this.http.post<any>( url, body, {
            headers: new HttpHeaders()
              .set('Content-Type', 'application/json')
              .set('Accept', 'application/json')
        // , responseType: 'json'
       //  , observe: 'response'
        })
    .pipe(
         tap(data => {
            if (isPimalionCloudServiceLog) {
                console.log('*srv*** PimalionCloudService.getProductsList() tap response -> %O', data);
            }
         }),
         map((response: any) => {

                if (isPimalionCloudServiceLog) {
                    console.log('*srv*** PimalionCloudService.getProductsList() map response -> %O', response);
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

                 const body: any = {
                    items: response.products, // response.body.tableValues,
                    sorts: response.sorts,
                    total: 100,  // response.headers.get('x-total-count'),
                    pages: 10, // response.headers.get('x-total-pages'),
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
  getProductDetailPage(productKey: string): Observable<Product> {

    // const url = `${environment.pimalionCloudUrl}/pimalion_demo2_api/api/product/render/html/${productKey}?version=web`;

    // https://demo.sourcing.pm/backend/api/shop/product?id=ReMSlWcBq_r5-pCSVC-G

    const url = `${environment.pimalionCloudUrl}/api/shop/product?id=${productKey}`;

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
             }),
            map(itemData => {
                // var i: number = 0;
                return  new ProductItem(itemData);
            }),
            tap((item: any) => {
                if (isPimalionCloudServiceLog) {
                    console.log('*srv*** PimalionCloudService.getProductDetailPage() item(Product) -> %O', item);
                }
            }),
            catchError((err: any): any => {
                console.log('*srv*** Error PimalionCloudService.getProductDetailPage() -> %O', err);
                return of(`<html><head>Product Detail Page</head> <body>Page not found </body></html>`);
            })
        );
  }
/*
  getProducts(body: any): Observable<any> {

    const url = `${environment.pimalionCloudUrl}/api/shop/search`;

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
