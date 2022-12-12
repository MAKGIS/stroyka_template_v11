export interface Brand {
    id: string; // number;  // ???
    name: string;
    slug: string;
    image: string;

    count?: number;  // pimaloin   // ???
}

export interface BrandPimalion {
    filterKey: string,
    filterValue: string,
    filterCount: number
}
