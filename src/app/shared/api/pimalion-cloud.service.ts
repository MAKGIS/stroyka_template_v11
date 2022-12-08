import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// import { Address } from './../../interfaces/address';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { Category, CategoryPimalion } from '../interfaces/category';
import { Brand, BrandPimalion } from '../interfaces/brand';
import { getCategoriesPimalion } from './products-list-pimalion';
import { IAttributePimalion, IDocumentPimalion, IImagePimalion, ISiteUrl, Product, ProductAttribute } from '../interfaces/product';
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

function getImagesForProduct(imagesPimalion: IImagePimalion[]): string[] {

    if (imagesPimalion.length === 0) {return [];}

    const images: string[] = [];

    imagesPimalion.forEach(image => {
        if (image.priority === 1) {
            images.push(image.url);
        }
    });

    return images;
}
function getSiteUrlForProduct(imagesPimalion: IImagePimalion[]): ISiteUrl[] {

    if (imagesPimalion.length === 0) {return [];}

    const items: ISiteUrl[] = [];

    imagesPimalion.forEach(item => {
        if (item.priority != 1) {
            if (!item.label) {
                item.label = 'url site';
            }
            items.push(item);
        }
    });

    return items;
}
function getDocumentsForProduct(documents: IDocumentPimalion[]): ISiteUrl[] {

    if (documents.length === 0) {return [];}

    const items_0: ISiteUrl[] = [];
    const items_1: ISiteUrl[] = [];
    const items_2: ISiteUrl[] = [];
    const items_Other: ISiteUrl[] = [];

    documents.forEach(item => {

        if (!item.label) {
            item.label = 'url document ';
        }

        if (item.priority === 0) {
            items_0.push(item);
        };

        if (item.priority === 1) {
            items_1.push(item);
        };

        if (item.priority === 2) {
            items_2.push(item);
        };

        if (item.priority > 2) {
            items_Other.push(item);
        };

    });

    var items: ISiteUrl[] = items_0.concat(items_1);
    items = items.concat(items_2);
    items = items.concat(items_Other);

    return items;
}

function getAttributesForProduct(attributesPimalion: IAttributePimalion[]): ProductAttribute[] {

    if (attributesPimalion.length === 0) {return [];}

    const items: ProductAttribute[] = [];
/*
      {
          "groupName": "Toutes les caracteristiques",
          "key": "Garde d'eau",
          "value": "6 cm "
        }
    name: string;
    slug: string;
    featured: boolean;
    values: ProductAttributeValue[];
    customFields: CustomFields;

*/
    attributesPimalion.forEach(item => {

        const attribute: any =   {
            name: item.key,
            slug: item.key,
            featured: true,
            values: [item.value],
            customFields: {}
        };
            items.push(attribute as ProductAttribute);

    });

    return items;
}

export class ProductItem implements Product {

    id: string;  // "id"
    slug: string;  // "id"
    name: string;  // "title"

    overview?: string;   // "overview"
    description?: string; // "description"

    sku: string;   // "pimSku"
    supplierReference?: string | null; // supplierReference

    price: number;   // "price"
    compareAtPrice: number|null; // "price" | null ???

    images: string[];
    urls: ISiteUrl[];
    imagesPimalion?: IImagePimalion[]; // "images"

    badges: string[];

    rating: number;
    reviews: number;
    availability: string;

    brandName?: string; // "brandName": "ARNOULD",
    brand: Brand|null;

    categories: Category[];

    attributes: ProductAttribute[];
    attributesPimalion?: IAttributePimalion[];

    documents?: IDocumentPimalion[];

    customFields: CustomFields;

    pimalionReviews?: string;   // ???

    pimalionHtml?: string;   // ???

    relatedProducts?: any[];
    productVariants?: any[];


    constructor( itemData: any ) {

        this.id =  itemData.id;     // "ReMSlWcBq_r5-pCSVC-G",
        this.slug = itemData.id;    // "ReMSlWcBq_r5-pCSVC-G",
        this.name = itemData.title;  // "PRISE TV SIMPLE COMPLET BL",

        this.overview = itemData.overview; // overview: string;   // "Arnould - PRISE TV SIMPLE COMPLET BL",
        this.description = itemData.description; // description: string;   // "Arnould - PRISE TV SIMPLE COMPLET BL",

        this.sku = itemData.pimSku;  // "100501957"  '83690/32',
        this.supplierReference = itemData.supplierReference;  // "100501957"  '83690/32',

        this.price = itemData.price; // + 1;      // "price": "0.0",
        this.compareAtPrice = itemData.price; // + 2;   //  number|null;

        this.images = getImagesForProduct(itemData.images);
        this.urls = getSiteUrlForProduct(itemData.images);
        this.imagesPimalion = itemData.images;

        this.badges = ['hot']; // badges: string[];

        this.rating = 2; // rating: number;
        this.reviews = 3; // reviews: number;
        this.availability = 'availability'; // availability: string;

        this.brandName = itemData.brandName; // "brandName": "ARNOULD",
        this.brand = { id: '1', name: itemData.brandName, slug: itemData.brandName, image: 'assets/images/logos/logo-1.png'};
        // brand: brands.find(x => x.slug === bran_Marque) || null, // brandCor

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
        this.attributes = getAttributesForProduct(itemData.attributes); //itemData.attributes; // attributes: ProductAttribute[];
        this.attributesPimalion = itemData.attributes;

        this.customFields = {}; // null;// customFields: CustomFields;

        this.documents = getDocumentsForProduct(itemData.documents);
        // ???
        this.relatedProducts = itemData.relatedProducts;    // any[];
        this.productVariants = itemData.productVariants;    // any[];

        this.pimalionReviews = 'pimalionReviews';  // ???

        this.pimalionHtml =  'pimalionHtml'   // ???
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
/*
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
*/
    if (isPimalionCloudServiceLog) {
        console.log('*srv*** PimalionCloudService.getProductsList() url -> %o  body -> %o', url, body);
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
                    items: response.body.products, // response.body.tableValues,
                    sorts: response.body.sorts,
                    total:  Number(response.headers.get('X-Total-Count')), // as number,  // 100, // 79581, //
                    pages: Number(response.headers.get('X-Total-Pages'))//  as number,   // 10  // 6632  //
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
