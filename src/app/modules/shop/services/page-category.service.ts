import { EventEmitter, Injectable } from '@angular/core';
import { ProductsList } from '../../../shared/interfaces/list';
import { Product } from '../../../shared/interfaces/product';
import { Filter, SerializedFilterValues } from '../../../shared/interfaces/filter';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ListOptions } from '../../../shared/api/shop.service';

/**
 * This service serves as a mediator between the PageCategoryComponent, ProductsViewComponent and WidgetFiltersComponent components.
 */
@Injectable()
export class PageCategoryService {
    // isLoading
    private isLoadingState = false;
    private isLoadingSource: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isLoadingState);

    isLoading$: Observable<boolean> = this.isLoadingSource.asObservable();

    // list
    private listState: ProductsList = null;
    private listSource: BehaviorSubject<ProductsList> = new BehaviorSubject<ProductsList>(this.listState);

    list$: Observable<ProductsList> = this.listSource.pipe(filter(x => x !== null));

    // options
    private optionsState: ListOptions = {};

    get options(): ListOptions {
        return this.optionsState;
    }

    optionsChange$: EventEmitter<ListOptions> = new EventEmitter<ListOptions>();

    // getters for list
    get items(): Product[] {
        if (this.listState) {
        // console.log("PageCategoryService listState.items -> %o", this.listState.items);
        return this.listState.items;
        }
        return [];
    }
    get page(): number {
        if (this.listState) {
        // console.log("PageCategoryService listState -> %o", this.listState);

        return this.listState.page;
        }
        return 0;
    }
    get limit(): number {
        if (this.listState) {
        return this.listState.limit;
        }
        return 0;
    }
    get sort(): string {
        if (this.listState) {
        return this.listState.sort;
        }
        return 'default';
    }
    get total(): number {
        if (this.listState) {
        return this.listState.total;
        }
        return 0;
    }
    get pages(): number {
        if (this.listState) {
        return this.listState.pages;
        }
        return 0;
    }
    get from(): number {
        if (this.listState) {
        return this.listState.from;
        }
        return 0;
    }
    get to(): number {
        if (this.listState) {
        return this.listState.to;
        }
        return 0;
    }

    get filters(): Filter[] {

        if (this.listState) {
        // console.log("PageCategoryService listState.filters -> %o", this.listState.filters);

        return this.listState.filters;
        }
        return [];
    }
    get filterValues(): SerializedFilterValues {

        if (this.listState) {
        // console.log("PageCategoryService listState.filterValues -> %o", this.listState.filterValues);

        return this.listState.filterValues;
        }
        return {};
    }

    // set functions
    setIsLoading(value: boolean): void {
        this.isLoadingState = value;
        this.isLoadingSource.next(value);
    }

    setList(list: ProductsList): void {
        this.listState = list;
        // console.log("@@@VSRV @@@ PageCategoryService.setList()  listState -> %o", this.listState);
        this.listSource.next(this.listState);
    }

    setOptions(options: ListOptions, emitEvent: boolean = true): void {
        const diff = this.optionsDiff(options);

        if ('limit' in diff || 'sort' in diff || 'filterValues' in diff) {
            options.page = 1;
        }

        this.optionsState = options;

        if (emitEvent && Object.keys(diff).length > 0) {
            this.optionsChange$.emit(diff);
        }
    }

    updateOptions(options: ListOptions, emitEvent: boolean = true): void {
        this.setOptions({...this.optionsState, ...options}, emitEvent);
    }

    /**
     * Returns only different options.
     */
    protected optionsDiff(curr: ListOptions): ListOptions {
        const result: ListOptions = {};

        ['page', 'limit', 'sort'].forEach(key => {
            if (key in curr && this[key] !== curr[key]) {
                result[key] = curr[key];
            }
        });

        if ('filterValues' in curr) {
            const filterValues = curr.filterValues;

            if (Object.keys(filterValues).length !== Object.keys(this.filterValues).length) {
                result.filterValues = {};
            }

            Object.keys(filterValues).forEach(key => {
                if (this.filterValues[key] !== filterValues[key]) {
                    if (!('filterValues' in result)) {
                        result.filterValues = {};
                    }

                    result.filterValues[key] = filterValues[key];
                }
            });
        }

        return result;
    }
}
