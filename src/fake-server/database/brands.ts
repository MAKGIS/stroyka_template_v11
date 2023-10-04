import { BrandDef } from '../interfaces/brand-def';
import { Brand } from '../../app/shared/interfaces/brand';
import { Observable, of } from 'rxjs';
import { Category } from 'src/app/shared/interfaces/category';
import { environment } from 'src/environments/environment';

let lastBrandId = 0;

var brandsDef: BrandDef[] =

[
    {  name: 'LEGRAND', slug: 'LEGRAND', image: 'assets/images/logos/logo-1.png'},
    {  name: 'ARNOULD', slug: 'ARNOULD', image: 'assets/images/logos/logo-2.png'},

    { name: 'BTICINO', slug: 'BTICINO', image: 'assets/images/logos/logo-3.png'},
    { name: 'PLANET WATTOHM', slug: 'PLANET WATTOHM', image: 'assets/images/logos/logo-4.png'}
];

/*
[
    { id: '1', name: 'Brandix1', slug: 'brandix', image: 'assets/images/logos/logo-1.png'},
    { id: '2', name: 'Wakita2', slug: 'wakita', image: 'assets/images/logos/logo-2.png'},

    { id: '3', name: 'Zosch', slug: 'zosch', image: 'assets/images/logos/logo-3.png'},
    { id: '4', name: 'WeVALT', slug: 'wevalt', image: 'assets/images/logos/logo-4.png'},
    { id: '5', name: 'Hammer', slug: 'hammer', image: 'assets/images/logos/logo-5.png'},
    { id: '6', name: 'Mitasia', slug: 'mitasia', image: 'assets/images/logos/logo-6.png'},
    { id: '7', name: 'Metaggo', slug: 'metaggo', image: 'assets/images/logos/logo-7.png'},
];
*/


export const brands: Brand[] = brandsDef.map(brandDef => {
    return {
        ...brandDef,
        id: ++lastBrandId + '',
    };
});

export function getBrands(): Observable<Brand[]> {
    return of(brands);
}
/*
function getCurrentBrands(): Brand[] {
    return brands;
}

function setShopBrandDef(brandsDefNew: BrandDef[]  ) {

    while(brandsDef.length > 0) {
        brandsDef.pop();
    }

    brandsDef = brandsDef.concat(brandsDefNew);

    brandsDef = [

        { id: '1', name: 'AAA1', slug: 'aaa1', image: 'assets/images/logos/logo-1.png'},
        { id: '2', name: 'BBB2', slug: 'bbb2', image: 'assets/images/logos/logo-2.png'}
    ]
}
*/
// 'fake-server'; 'json'; 'demo.sourcing.pm';
const modeSource: string =  environment.modeApp; // 'demo.sourcing.pm';

export function getModeSource(): string {

    // const mode = 'fake-server'; //
    // const mode = 'json';
    // 'demo.sourcing.pm';
    const mode = modeSource;

    return mode;
}

var  categoriesName: string[] = [];

export function getCategoriesName(): string[] {

    switch(getModeSource()) {

        case 'demo.sourcing.pm':

            categoriesName =  [ 'Sanitaire*', 'Electricité*', 'Outillage*', 'Chauffage*', 'Test*' ];
           break;

        default: // 'fake-server'; 'json':

        categoriesName =  [ 'Power Tools', 'Hand Tools', 'Plumbing', 'Machine Tools', 'Power Machinery', 'Measurement', 'Clothes and Ppe'];
    }

    return categoriesName;
}

var  categoriesSlug: string[] = [];

export function getCategoriesSlug(): string[] {

    switch(getModeSource()) {

        case 'demo.sourcing.pm':

            categoriesSlug =  [ 'Sanitaire', 'Electricité', 'Outillage', 'Chauffage', "Test" ];
           break;

        default: // 'fake-server'; 'json':
        categoriesSlug =  [ 'power-tools', 'hand-tools', 'machine-tools', 'power-machinery', 'measurement', 'clothes-and-ppe'];
    }

    return categoriesSlug;
}


export function getRootCategorySlug(): string {

    return getCategoriesSlug()[0];
}

export function getProductStandard(): string {

     let product = '';
    switch(getModeSource()) {

        case 'demo.sourcing.pm':

            product =   '0uFgJWgBenVimcVmXyoT'; // '2eFgJWgBenVimcVmXyoT';
           break;

        default: // 'fake-server'; 'json':
            product =  'brandix-screwdriver-screw1500acc';
    }

    return product;
}

