import { Brand } from './brand';
import { Category } from './category';
import { CustomFields } from './custom-fields';

export interface ProductFeature {
    name: string;
    value: string;
}

export interface ProductFeaturesSection {
    name: string;
    features: ProductFeature[];
}

export interface ProductAttributeValue {
    name: string;
    slug: string;
    customFields: CustomFields;
}

export interface ProductAttribute {
    name: string;
    slug: string;
    featured: boolean;
    values: ProductAttributeValue[];
    customFields: CustomFields;
}

// --- Pimalion --------------------
/*
"images": [
    {
              "url": "https://www.nicoll.fr/sites/default/files/products/35666.jpg",
              "priority": 1,
              "label": null
            }, ... ]
    */
export interface ImagePimalion {
    url: string;
    priority: number;
    label: string;
}
/*
"documents": [
        {
          "url": "https://medias.nicoll.fr/medias-fabdis/documents/35870.pdf",
          "priority": 1,
          "label": "FICHE"
        }, ... ]
        */
export interface DocumentPimalion {
    url: string;
    priority: number;
    label: string;
}
/*
   "attributes": [
 {
          "groupName": "Toutes les caractéristiques",
          "key": "Categorie produit",
          "value": "caniveau "
        }, ... ]
*/
export interface AttributePimalion {
    groupName: string;
    key: number;
    value: string;
}
export interface Product {
    id: string;    // "id"
    slug: string;  // "id"
    name: string;  // "title"

    overview?: string;  // "overview"
    description?: string; // "description"

    sku: string;    // "pimSku"
    supplierReference?: string | null; // supplierReference
    price: number;    // "price"
    compareAtPrice: number|null;  // "price" ???

    images: string[];
    imagesPimalion?: ImagePimalion[];  // "images"

    badges: string[];
    rating: number;
    reviews: number;
    availability: string;

    brandName?: string | null; // "brandName": "ARNOULD",
    brand: Brand|null;

    categories: Category[];

    attributes: ProductAttribute[];
    attributePimalion?: AttributePimalion[];  // "attributes"

    documents?: DocumentPimalion[];

    customFields: CustomFields;

    pimalionReviews?: string,   // ???

    pimalionHtml?: string   // ???

    relatedProducts?: any[];
    productVariants?: any[];
}
