import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../interfaces/category';
import { HttpClient } from '@angular/common/http';

import { delay, tap } from 'rxjs/operators';

import { getBlogCategoriesTree } from '../../../fake-server';

const delayTest = 0;

const mode: string = 'json'; // 'demo.sourcing.pm';  // 'fake-server', 'json',  'demo.sourcing.pm'


@Injectable({
    providedIn: 'root'
})
export class BlogService {
    isViewConsole = true;

    constructor(
        private http: HttpClient,
    ) { }

    /**
     * Returns a category tree.
     *
     * @param parent - If a parent is specified then its descendants will be returned.
     * @param depth  - Maximum depth of category tree.
     */
    getCategories(parent: Partial<Category> = null, depth: number = 0): Observable<Category[]> {
        /**
         * This is what your API endpoint might look like:
         *
         * https://example.com/api/blog/categories.json?parent=latest-news&depth=1
         *
         * where:
         * - parent = parent.slug
         * - depth  = depth
         */
        // const params: {[param: string]: string} = {
        //     parent: parent.slug,
        //     depth,
        // };
        //
        // return this.http.get<Category[]>('https://example.com/api/blog/categories.json', {params});

        // This is for demonstration purposes only. Remove it and use the code above.
        // return getBlogCategoriesTree(parent ? parent.slug : null, depth);

        switch (mode) {

            case 'fake-server':

                return getBlogCategoriesTree(parent ? parent.slug : null, depth);
                break;
            case 'json':

                return this.http.get<Category[]>('assets/api/blog/categories.json')
                    .pipe(
                        tap( n=>
                            {
                                if (this.isViewConsole) {console.log('--srv-- BlogService getCategories delayTest -> %o', delayTest)}
                        }),
                        delay(delayTest)
                        );
                        break;
            case 'demo.sourcing.pm':

                return this.http.get<Category[]>('assets/api/blog/categories.json')
                        .pipe(
                            tap( n=>
                                {
                                    if (this.isViewConsole) {console.log('--srv-- BlogService getCategories delayTest -> %o', delayTest)}
                            }),
                            delay(delayTest)
                            );

                            break;
             default:

                return getBlogCategoriesTree(parent ? parent.slug : null, depth);
        }

    }
}
