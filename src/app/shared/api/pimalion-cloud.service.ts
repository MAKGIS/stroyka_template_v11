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

import { BrandsService } from './brands.service';
import { CategoriesService } from './categories.service';


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
    count: number;

    constructor( id: string, name: string, slug: string, filterCount: number ) {

        this.id =  id;     // ???

        this.name = name,
        this.slug = slug,

        this.count = filterCount + 1  // ???
    }
}


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

function getAttrGroupNameForProduct(attributesPimalion: IAttributePimalion[]): string[] {

    if (attributesPimalion.length === 0) {return [];}

    const items: string[] = [];

    attributesPimalion.forEach(item => {

       const groupName = item.groupName;
       if ( items.indexOf(groupName) < 0) {
            items.push(groupName);
       }
    });

    return items; // .sort();
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
    attributesGroupName?: string[];

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
        this.compareAtPrice = null; // + 2;   //  number|null;

        this.images = getImagesForProduct(itemData.images);
        this.urls = getSiteUrlForProduct(itemData.images);
        this.imagesPimalion = itemData.images;

        this.badges = itemData.keywords; //['hot']; // badges: string[];

        this.rating = 2; // rating: number;
        this.reviews = 3; // reviews: number;
        this.availability = 'availability'; // availability: string;

        this.brandName = itemData.brandName; // "brandName": "ARNOULD",
        this.brand = { id: '1', name: itemData.brandName, slug: itemData.brandName, image: 'assets/images/logos/logo-1.png'};
        // brand: brands.find(x => x.slug === bran_Marque) || null, // brandCor

        this.categories = [
            { id:'1',
             name: 'Sanitaire',
             slug: 'Sanitaire',
             items: 111 ,
             path: 'category',
             image: null,
             type: 'shop',
             customFields: {},
                parents: null,
                children: null
            }];

        // ???
        this.attributes = getAttributesForProduct(itemData.attributes); //itemData.attributes; // attributes: ProductAttribute[];
        this.attributesPimalion = itemData.attributes;
        this.attributesGroupName = getAttrGroupNameForProduct(itemData.attributes);

        this.customFields = {}; // null;// customFields: CustomFields;

        this.documents = getDocumentsForProduct(itemData.documents);
        // ???
        this.relatedProducts = itemData.relatedProducts;    // any[];
        this.productVariants = itemData.productVariants;    // any[];

        this.pimalionReviews = 'pimalionReviews';  // ???

        this.pimalionHtml =  'pimalionHtml'   // ???
    }
};


@Injectable({
  providedIn: 'root'
})
export class PimalionCloudService {

    isViewConsole = true;

  constructor(private http: HttpClient) { }

  // 01 Post Homepage Get all categories
  getCloudCategoriesList(categoriesService: CategoriesService): Observable<Category[]> {

    // const url = `${environment.pimalionCloudUrl}/api/shop/categories`;
    // mak ???
    const url = 'assets/api/categories/categories_fr.json';

    if (this.isViewConsole) {
        console.log('--srv-- PimalionCloudService.getCloudCategoriesList() -> %o ', url);
    }

      const httpOptions_cat = {
        headers: new HttpHeaders()
              .set('Content-Type', 'application/json')
              .set('Accept',  'application/json')
        };

     // return this.http.get<CategoryPimalion[]>(url, httpOptions_cat)
     return this.http.get<Category[]>(url, httpOptions_cat)  // mak ???
    .pipe(

                tap((items: any) => {
                    if (this.isViewConsole) {
                        console.log('--srv-- PimalionCloudService.getCloudCategoriesList() items -> %O', items);
                    }
                }),
                map(itemData => {

                    var i: number = 0;
                    const categories = itemData.map(value => {
                        i = i + 1;
                        // return new CategoryItem(i + '', value.filterValue, value.filterValue, value.filterCount);
                        // mak ???
                        return new CategoryItem(value.id, value.name, value.slug, value.items);

                    })

                    if (this.isViewConsole) {
                        console.log('--srv-- PimalionCloudService.getCloudCategoriesList() categories -> %O', categories);
                    }

                    categoriesService.next(categories);

                    return categories;
                }),
                tap((items: any) => {
                    if (this.isViewConsole) {
                        console.log('--srv-- PimalionCloudService.getCloudCategoriesList() items(Categories) -> %O', items);
                    }
                }),

                catchError((err: any): any => {
                        console.log('--srv-- Error PimalionCloudService.getCloudCategoriesList() -> %O', err);
                    return of([]);
                })
            )
    }

  // 02 Post Brands A list of brands
  getCloudBrandsList(brandsService: BrandsService): Observable<Brand[]> {

    const url = `${environment.pimalionCloudUrl}/api/shop/brands`;

    if (this.isViewConsole) {
        console.log('--srv-- PimalionCloudService.getCloudBrandsList() url -> %o', url);
    }

    return this.http.get<BrandPimalion[]>( url,  httpOptions)
        .pipe(
            tap((items: any) => {
                if (this.isViewConsole) {
                    console.log('--srv-- PimalionCloudService.getCloudBrandsList() items -> %O', items);
                }
            }),
            map(itemData => {
                var i: number = 0;

                const brands = itemData.map(value => {
                    i = i + 1;
                    return new BrandItem(i + '', value.filterValue, value.filterValue, value.filterCount);
                });

                if (this.isViewConsole) {
                    console.log('--srv-- PimalionCloudService.getCloudBrandsList() brands -> %O', brands);
                }

                brandsService.next(brands);

                return brands;
            }),
            tap((items: any) => {
                if (this.isViewConsole) {
                    console.log('--srv-- PimalionCloudService.getCloudBrandsList() items(Brands) -> %O', items);
                }
            }),

            catchError((err: any): any => {
                console.log('--srv-- Error PimalionCloudService.getCloudBrandsList() -> %O', err);
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
                   console.log('--srv-- Error PimalionCloudService.getProductsList() body -> NULL');
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
    if (this.isViewConsole) {
        console.log('--srv-- PimalionCloudService.getProductsList() url -> %o  body -> %o', url, body);
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
            if (this.isViewConsole) {
                console.log('--srv-- PimalionCloudService.getProductsList() tap response -> %O', data);
            }
         }),
         map((response: any) => {

                if (this.isViewConsole) {
                  //  console.log('--srv-- PimalionCloudService.getProductsList() map response -> %O', response);
                }

                 const body: any = {
                    items: response.body.products, // response.body.tableValues,
                    sorts: response.body.sorts,
                    total:  Number(response.headers.get('X-Total-Count')), // as number,  // 100, // 79581, //
                    pages: Number(response.headers.get('X-Total-Pages'))//  as number,   // 10  // 6632  //
                  };


                  if (this.isViewConsole) {
                    console.log('--srv-- PimalionCloudService.getProductsList() body -> %O', body);
                  }
                 return body;
             }),
            catchError((err: any): any => {
                console.log('--srv-- Error PimalionCloudService.getProductsList() -> %O', err);
                return of([]);
            })
        );
    }

  // 04 Get The product detail page
  getProductDetailPage(productKey: string): Observable<Product> {

    // const url = `${environment.pimalionCloudUrl}/pimalion_demo2_api/api/product/render/html/${productKey}?version=web`;

    // https://demo.sourcing.pm/backend/api/shop/product?id=ReMSlWcBq_r5-pCSVC-G

    const url = `${environment.pimalionCloudUrl}/api/shop/product?id=${productKey}`;

    if (this.isViewConsole) {
        console.log('--srv-- PimalionCloudService.getProductDetailPage() url -> %o', url);
    }
    // productKey = 'Ipw9LHUBUvwcyS3bkdSh';

    return this.http.get<any>( url, httpOptions)
    .pipe(
             tap((item: any) => {
                if (this.isViewConsole) {
                    console.log('--srv-- PimalionCloudService.getProductDetailPage() items -> %O', item);
                }
             }),
            map(itemData => {
                // var i: number = 0;
                return  new ProductItem(itemData);
            }),
            tap((item: any) => {
                if (this.isViewConsole) {
                    console.log('--srv-- PimalionCloudService.getProductDetailPage() item(Product) -> %O', item);
                }
            }),
            catchError((err: any): any => {
                console.log('--srv-- Error PimalionCloudService.getProductDetailPage() -> %O', err);
                return of(`<html><head>Product Detail Page</head> <body>Page not found </body></html>`);
            })
        );
  }

  getProductDetailPage_01(productKey: string): Observable<Product> {

    // const url = `${environment.pimalionCloudUrl}/pimalion_demo2_api/api/product/render/html/${productKey}?version=web`;

    // https://demo.sourcing.pm/backend/api/shop/product?id=ReMSlWcBq_r5-pCSVC-G

    const url = `${environment.pimalionCloudUrl}/api/shop/product?id=${productKey}&action=Générer%20un%20titre`;

    if (this.isViewConsole) {
        console.log('--srv-- PimalionCloudService.getProductDetailPage_01() url -> %o', url);
    }
    // productKey = 'Ipw9LHUBUvwcyS3bkdSh';

    return this.http.get<any>( url, httpOptions)
    .pipe(
             tap((item: any) => {
                if (this.isViewConsole) {
                    console.log('--srv-- PimalionCloudService.getProductDetailPage_01() item -> %O', item);
                }
             }),
             /*
            map(itemData => {
                // var i: number = 0;
                return  new ProductItem(itemData);
            }), */
            tap((item: any) => {
                if (this.isViewConsole) {
                    console.log('--srv-- PimalionCloudService.getProductDetailPage() item(Product) -> %O', item);
                }
            }),
            catchError((err: any): any => {
                console.log('--srv-- Error PimalionCloudService.getProductDetailPage() -> %O', err);
                return of(`<html><head>Product Detail Page</head> <body>Page not found </body></html>`);
            })
        );
  }

/*
  getProducts(body: any): Observable<any> {

    const url = `${environment.pimalionCloudUrl}/api/shop/search`;

    if (this.isViewConsole) {
        console.log('--srv-- PimalionCloudService.getProductsList() url -> %o', url);
    }
    if (!body) {

                   console.log('--srv-- Error PimalionCloudService.getProductsList() body -> NULL');
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

                if (this.isViewConsole) {
                    console.log('--srv-- PimalionCloudService.getProductsList() response -> %O', response);
                }
                 // const keys = response.headers.keys();

                 // tslint:disable-next-line:no-shadowed-variable

                  if (this.isViewConsole) {
                    console.log('--srv-- PimalionCloudService.getProductsList() response.body.tableValues -> %O', response.body.tableValues);
                  }
                 return response.body.tableValues;
             }),
            catchError((err: any): any => {
                console.log('--srv-- Error PimalionCloudService.getProductsList() -> %O', err);
                return of([]);
            })
        );
    }
  */


}
