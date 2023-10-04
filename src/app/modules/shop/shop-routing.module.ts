import { NgModule } from '@angular/core';
import { Routes, RouterModule, Data, ResolveData } from '@angular/router';
import { PageCategoryComponent } from './pages/page-category/page-category.component';
import { PageCartComponent } from './pages/page-cart/page-cart.component';
import { PageWishlistComponent } from './pages/page-wishlist/page-wishlist.component';
import { PageCheckoutComponent } from './pages/page-checkout/page-checkout.component';
import { PageCompareComponent } from './pages/page-compare/page-compare.component';
import { PageTrackOrderComponent } from './pages/page-track-order/page-track-order.component';
import { CheckoutGuard } from './guards/checkout.guard';
import { PageProductComponent } from './pages/page-product/page-product.component';
import { ProductsListResolverService } from './resolvers/products-list-resolver.service';
import { CategoryResolverService } from './resolvers/category-resolver.service';
import { ProductResolverService } from './resolvers/product-resolver.service';
import { PageOrderSuccessComponent } from './pages/page-order-success/page-order-success.component';


import { PagePimalionCategoriesComponent } from 'src/app/pimalion/pages/page-categories/page-pimalion-categories.component';
import { PagePimalionBrandsComponent } from 'src/app/pimalion/pages/page-brands/page-pimalion-brands.component';

import { getModeSource, getProductStandard, getRootCategorySlug } from 'src/fake-server/database/brands';

// const mode: string = getModeSource(); //  'demo.sourcing.pm'; // getModeSource();

const rootCategorySlug: string  = getRootCategorySlug(); //'Sanitaire';  // 'power-tools'

const categoryPageData: Data = {
    // Number of products per row. Possible values: 3, 4, 5.
    columns: 3,
    // Shop view mode by default. Possible values: 'grid', 'grid-with-features', 'list'.
    viewMode: 'grid',
    // Sidebar position. Possible values: 'start', 'end'.
    // It does not matter if the value of the 'columns' parameter is not 3.
    // For LTR scripts "start" is "left" and "end" is "right".
    sidebarPosition: 'start'
};

const categoryPageResolvers: ResolveData = {
    category: CategoryResolverService,
    products: ProductsListResolverService
};

const routes: Routes =  [
    {
        path: 'catalog',
        component: PageCategoryComponent,
        data: categoryPageData,
        resolve: categoryPageResolvers,
    },
    // --- shop-pimalion-routing.modele.ts -----
    {
        path: 'categories',
        pathMatch: 'full',
        component: PagePimalionCategoriesComponent
    },
    {
        path: 'brands',
        pathMatch: 'full',
        component: PagePimalionBrandsComponent
    },
    // -----------------------------------------
    {
        path: 'catalog/:categorySlug',
        component: PageCategoryComponent,
        data: categoryPageData,
        resolve: categoryPageResolvers,
    },
    {
        path: 'products/:productSlug',
        component: PageProductComponent,
        data: {
            // Product page layout. Possible values: 'standard', 'columnar', 'sidebar'.
            layout: 'standard',
            // Sidebar position. Possible values: 'start', 'end'.
            // It does not matter if the value of the 'layout' parameter is not 'sidebar'.
            // For LTR scripts "start" is "left" and "end" is "right".
            sidebarPosition: 'start'
        },
        resolve: {
            product: ProductResolverService
        },
    },
    {
        path: 'cart',
        pathMatch: 'full',
        component: PageCartComponent
    },
    {
        path: 'cart/checkout',
        component: PageCheckoutComponent,
        canActivate: [CheckoutGuard],
    },
    {
        path: 'cart/checkout/success',
        component: PageOrderSuccessComponent,
    },
    {
        path: 'wishlist',
        component: PageWishlistComponent
    },
    {
        path: 'compare',
        component: PageCompareComponent
    },
    {
        path: 'track-order',
        component: PageTrackOrderComponent
    },

    // --- START ---
    // The following routes are only needed to demonstrate possible layouts of some pages. You can delete them.
    {
        path: 'category-grid-4-columns-full',
        component: PageCategoryComponent,
        data: {
            columns: 4,
            viewMode: 'grid',
            categorySlug: rootCategorySlug   // ???  'Sanitaire' //
        },
        resolve: {
            category: CategoryResolverService,
            products: ProductsListResolverService
        },
    },
    {
        path: 'category-grid-5-columns-full',
        component: PageCategoryComponent,
        data: {
            columns: 5,
            viewMode: 'grid',
            categorySlug: rootCategorySlug  // ???  'Sanitaire' //
        },
        resolve: {
            category: CategoryResolverService,
            products: ProductsListResolverService
        },
    },
    {
        path: 'category-list',
        component: PageCategoryComponent,
        data: {
            columns: 3,
            viewMode: 'list',
            sidebarPosition: 'start',
            categorySlug:  rootCategorySlug // ???  'Sanitaire' //
        },
        resolve: {
            category: CategoryResolverService,
            products: ProductsListResolverService
        },
    },
    {
        path: 'category-right-sidebar',
        component: PageCategoryComponent,
        data: {
            columns: 3,
            viewMode: 'grid',
            sidebarPosition: 'end',
            categorySlug: rootCategorySlug  // ???  'Sanitaire' //
        },
        resolve: {
            category: CategoryResolverService,
            products: ProductsListResolverService
        },
    },
    {
        path: 'product-standard',
        component: PageProductComponent,
        data: {
            layout: 'standard',
            sidebarPosition: 'start',
            productSlug: getProductStandard(), //'brandix-screwdriver-screw1500acc',
        },
        resolve: {
            product: ProductResolverService
        },
    },
    {
        path: 'product-columnar',
        component: PageProductComponent,
        data: {
            layout: 'columnar',
            productSlug: getProductStandard(), // 'brandix-screwdriver-screw1500acc',
        },
        resolve: {
            product: ProductResolverService
        },
    },
    {
        path: 'product-sidebar',
        component: PageProductComponent,
        data: {
            layout: 'sidebar',
            sidebarPosition: 'start',
            productSlug: getProductStandard(), //'brandix-screwdriver-screw1500acc',
        },
        resolve: {
            product: ProductResolverService
        },
    },
    // --- END ---
];

 const routes_fake_server: Routes = [
    {
        path: 'catalog',
        component: PageCategoryComponent,
        data: categoryPageData,
        resolve: categoryPageResolvers,
    },
    // --- shop-pimalion-routing.modele.ts -----
    {
        path: 'categories',
        pathMatch: 'full',
        component: PagePimalionCategoriesComponent
    },
    {
        path: 'brands',
        pathMatch: 'full',
        component: PagePimalionBrandsComponent
    },
    // -----------------------------------------
    {
        path: 'catalog/:categorySlug',
        component: PageCategoryComponent,
        data: categoryPageData,
        resolve: categoryPageResolvers,
    },
    {
        path: 'products/:productSlug',
        component: PageProductComponent,
        data: {
            // Product page layout. Possible values: 'standard', 'columnar', 'sidebar'.
            layout: 'standard',
            // Sidebar position. Possible values: 'start', 'end'.
            // It does not matter if the value of the 'layout' parameter is not 'sidebar'.
            // For LTR scripts "start" is "left" and "end" is "right".
            sidebarPosition: 'start'
        },
        resolve: {
            product: ProductResolverService
        },
    },
    {
        path: 'cart',
        pathMatch: 'full',
        component: PageCartComponent
    },
    {
        path: 'cart/checkout',
        component: PageCheckoutComponent,
        canActivate: [CheckoutGuard],
    },
    {
        path: 'cart/checkout/success',
        component: PageOrderSuccessComponent,
    },
    {
        path: 'wishlist',
        component: PageWishlistComponent
    },
    {
        path: 'compare',
        component: PageCompareComponent
    },
    {
        path: 'track-order',
        component: PageTrackOrderComponent
    },

    // --- START ---
    // The following routes are only needed to demonstrate possible layouts of some pages. You can delete them.
    {
        path: 'category-grid-4-columns-full',
        component: PageCategoryComponent,
        data: {
            columns: 4,
            viewMode: 'grid',
            categorySlug: 'power-tools', // rootCategorySlug,
        },
        resolve: {
            category: CategoryResolverService,
            products: ProductsListResolverService
        },
    },
    {
        path: 'category-grid-5-columns-full',
        component: PageCategoryComponent,
        data: {
            columns: 5,
            viewMode: 'grid',
            categorySlug: 'power-tools', // rootCategorySlug, // 'power-tools', //
        },
        resolve: {
            category: CategoryResolverService,
            products: ProductsListResolverService
        },
    },
    {
        path: 'category-list',
        component: PageCategoryComponent,
        data: {
            columns: 3,
            viewMode: 'list',
            sidebarPosition: 'start',
            categorySlug:  'power-tools', // rootCategorySlug,
        },
        resolve: {
            category: CategoryResolverService,
            products: ProductsListResolverService
        },
    },
    {
        path: 'category-right-sidebar',
        component: PageCategoryComponent,
        data: {
            columns: 3,
            viewMode: 'grid',
            sidebarPosition: 'end',
            categorySlug: 'power-tools', //rootCategorySlug,
        },
        resolve: {
            category: CategoryResolverService,
            products: ProductsListResolverService
        },
    },
    {
        path: 'product-standard',
        component: PageProductComponent,
        data: {
            layout: 'standard',
            sidebarPosition: 'start',
            productSlug: getProductStandard(), // 'brandix-screwdriver-screw1500acc',
        },
        resolve: {
            product: ProductResolverService
        },
    },
    {
        path: 'product-columnar',
        component: PageProductComponent,
        data: {
            layout: 'columnar',
            productSlug: getProductStandard(), // 'brandix-screwdriver-screw1500acc',
        },
        resolve: {
            product: ProductResolverService
        },
    },
    {
        path: 'product-sidebar',
        component: PageProductComponent,
        data: {
            layout: 'sidebar',
            sidebarPosition: 'start',
            productSlug: getProductStandard(), // 'brandix-screwdriver-screw1500acc',
        },
        resolve: {
            product: ProductResolverService
        },
    },
    // --- END ---
];

// routes = routes_http;
/*
switch (getModeSource()) {

    case 'demo.sourcing.pm':

        routes = routes_http;

    break;

     default:
       // 'fake-server':  'json':

       routes = routes_fake_server;

  }
*/





@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ShopRoutingModule { }
