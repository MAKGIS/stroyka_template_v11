import { Component, Inject, Input, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DirectionService } from '../../../shared/services/direction.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
    ColorFilter,
    ColorFilterItem,
    Filter,
    SerializedFilterValues,
    CheckFilter,
    FilterItem, RadioFilter
} from '../../../shared/interfaces/filter';
import { RootService } from '../../../shared/services/root.service';
import { Subject } from 'rxjs';
import { PageCategoryService } from '../../shop/services/page-category.service';
import { map, takeUntil } from 'rxjs/operators';

import { FilterOptionItem, FilterOptionService } from 'src/app/shared/api/filter-option.service';

interface FormFilterValues {
    [filterSlug: string]: [number, number] | {[itemSlug: string]: boolean} | string;
}

@Component({
    selector: 'app-widget-filters',
    templateUrl: './widget-filters.component.html',
    styleUrls: ['./widget-filters.component.scss']
})
export class WidgetFiltersComponent implements OnInit, OnDestroy {
    @Input() offcanvas: 'always'|'mobile' = 'mobile';

    destroy$: Subject<void> = new Subject<void>();

    filters: Filter[];
    filtersForm: FormGroup;
    isPlatformBrowser = isPlatformBrowser(this.platformId);
    rightToLeft = false;

    constructor(
        @Inject(PLATFORM_ID) private platformId: any,
        private direction: DirectionService,
        private fb: FormBuilder,
        public root: RootService,
        public pageCategoryService: PageCategoryService,
        private filterOptionService: FilterOptionService
    ) {
        this.rightToLeft = this.direction.isRTL();
    }

    ngOnInit(): void {
        this.pageCategoryService.list$.pipe(
            map(x => x.filters),
            takeUntil(this.destroy$),
        ).subscribe(filters => {
            this.filters = filters;
            this.filtersForm = this.makeFiltersForm(filters);

            this.filtersForm.valueChanges.subscribe(formValues => {
                console.log('-c->>> WidgetFiltersComponent.filtersForm.valueChanges filters ->%o', filters);
                console.log('-c->>> WidgetFiltersComponent.filtersForm.valueChanges formValues ->%o', formValues );

                const filtersBrand = this.convertFormToFilterBrandsValues(filters, formValues);

                // mak ???

                    const item = filtersBrand; // [{"key": "brandName.keyword", "value": "NICOLL"}];
                    var filterOption = new  FilterOptionItem (item);

                    this.filterOptionService.next(filterOption);

                this.pageCategoryService.updateOptions({
                    filterValues: this.convertFormToFilterValues(filters, formValues),
                    filtersBrand: filtersBrand
                });
            });
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    trackBySlug(index: number, item: {slug: string}): any {
        return item.slug;
    }

    makeFiltersForm(filters: Filter[]): FormGroup {
        const filtersFromGroup = {};

        // console.log('-- cmp -- WidgetFiltersComponent.ngOnInit() filters ->%o', filters, filters);

        filters.forEach(filter => {
            switch (filter.type) {
                case 'range':
                case 'radio':
                    filtersFromGroup[filter.slug] = this.fb.control(filter.value);
                    break;
                case 'check':
                case 'color':
                    filtersFromGroup[filter.slug] = this.makeListFilterForm(filter);
                    break;
            }
        });

        return this.fb.group(filtersFromGroup);
    }

    makeListFilterForm(filter: CheckFilter|ColorFilter): FormGroup {
        const group = {};

        filter.items.forEach(item => {
            const control = this.fb.control(filter.value.includes(item.slug));

            // A timeout is needed because sometimes a state change is ignored if performed immediately.
            setTimeout(() => {
                if (this.isItemDisabled(filter, item)) {
                    control.disable({emitEvent: false});
                } else {
                    control.enable({emitEvent: false});
                }
            }, 0);

            group[item.slug] = control;
        });

        return this.fb.group(group);
    }

    isItemDisabled(filter: CheckFilter|RadioFilter|ColorFilter, item: FilterItem|ColorFilterItem): boolean {
        return item.count === 0 && (filter.type === 'radio' || !filter.value.includes(item.slug));
    }

    convertFormToFilterValues(filters: Filter[], formValues: FormFilterValues): SerializedFilterValues {
        const filterValues: SerializedFilterValues = {};

        filters.forEach(filter => {
            const formValue = formValues[filter.slug];

            switch (filter.type) {
                case 'range':
                    if (formValue && (formValue[0] !== filter.min || formValue[1] !== filter.max)) {
                        filterValues[filter.slug] = `${formValue[0]}-${formValue[1]}`;
                    }
                    break;
                    // mak
                case 'check':
                    const filterFormValuesCheck = formValue as object || {};

                    // Reactive forms do not add a values of disabled checkboxes.
                    // This code will add them manually.
                    filter.value.forEach(filterValue => {
                        if (!(filterValue in filterFormValuesCheck)) {
                            filterFormValuesCheck[filterValue] = true;
                        }
                    });

                    const valuesCheck = Object.keys(filterFormValuesCheck).filter(x => filterFormValuesCheck[x]);

                    if (valuesCheck.length > 0) {
                        filterValues[filter.slug] = valuesCheck.join(',');
                    }
                    break;

                case 'color':
                    const filterFormValues = formValue as object || {};

                    // Reactive forms do not add a values of disabled checkboxes.
                    // This code will add them manually.
                    filter.value.forEach(filterValue => {
                        if (!(filterValue in filterFormValues)) {
                            filterFormValues[filterValue] = true;
                        }
                    });

                    const values = Object.keys(filterFormValues).filter(x => filterFormValues[x]);

                    if (values.length > 0) {
                        filterValues[filter.slug] = values.join(',');
                    }
                    break;
                case 'radio':
                    if (formValue !== filter.items[0].slug) {
                        filterValues[filter.slug] = formValue as string;
                    }

                    break;
            }
        });

        return filterValues;
    }

    convertFormToFilterBrandsValues(filters: Filter[], formValues: FormFilterValues): any[] {
        const filterValues: any[] = [];

        filters.forEach(filter => {
            const formValue = formValues[filter.slug];

            switch (filter.type) {
                case 'range':

                    break;
                    // mak
                case 'check':
                    const filterFormValuesCheck = formValue as object || {};

                    // Reactive forms do not add a values of disabled checkboxes.
                    // This code will add them manually.
                    filter.value.forEach(filterValue => {
                        if (!(filterValue in filterFormValuesCheck)) {
                            filterFormValuesCheck[filterValue] = true;
                        }
                    });

                    const valuesCheck = Object.keys(filterFormValuesCheck).filter(x => filterFormValuesCheck[x]);
                        // filters: [{'key': 'brandName.keyword', 'value': 'NICOLL'}]
                    if (valuesCheck.length > 0) {
                        valuesCheck.forEach(filterValue => {
                            filterValues.push({'key': 'brandName.keyword', 'value': filterValue});
                        });
                        // filterValues.push({'key': 'brandName.keyword', 'value': valuesCheck[0]});
                    }
                    break;

                case 'color':

                    break;
                case 'radio':

                    break;
            }
        });

        return filterValues;
    }

    reset(): void {
        const formValues = {};

        this.filters.forEach(filter => {
            switch (filter.type) {
                case 'range':
                    formValues[filter.slug] = [filter.min, filter.max];
                    break;
                case 'check':
                case 'color':
                    formValues[filter.slug] = {};

                    filter.items.forEach(item => {
                        formValues[filter.slug][item.slug] = false;
                    });
                    break;
                case 'radio':
                    formValues[filter.slug] = filter.items[0].slug;
                    break;
            }
        });

        this.filtersForm.setValue(formValues);
    }
}
