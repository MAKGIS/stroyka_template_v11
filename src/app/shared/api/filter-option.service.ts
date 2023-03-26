import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { FilterValue } from './shop.service'
// import { Brand } from '../interfaces/brand';

// [{"key": "brandName.keyword", "value": "NICOLL"}]
// interface FilterValue {
//     key: string;
//     value: string;
// }

export interface IFilterOption {
    filtersBrand?: FilterValue[];
}

export interface IFilterOptionServiceInterface {
    reset(): void;
    complete(): void;
    next(filterOption: IFilterOption): void;
  }

export   class FilterOptionItem implements IFilterOption {

    filtersBrand: FilterValue[];

    constructor( filtersBrand_: FilterValue[] ) {

        this.filtersBrand = filtersBrand_;
    }
}


@Injectable({
    providedIn: 'root'
})
export class FilterOptionService implements IFilterOptionServiceInterface {

  private filterOptionInit: IFilterOption = {
    filtersBrand: []
  };

  public FilterOptionChangedSub$ =  new BehaviorSubject<IFilterOption>(this.filterOptionInit);
  public FilterOptionChanged$ = this.FilterOptionChangedSub$.asObservable();
  // not use !!!
  // public FilterOptionChangedValue = this.FilterOptionChangedSub$.getValue();

  constructor() {
  }

  public reset() {
      this.FilterOptionChangedSub$.next(this.filterOptionInit);
  }
  public complete() {
    this.FilterOptionChangedSub$.complete();
  }
  public next(filterOption: IFilterOption) {
    if (filterOption) {
        console.log('*srv*** FilterOptionService.next() filterOption -> %O', filterOption);
      this.FilterOptionChangedSub$.next(filterOption);
    } else {
        this.FilterOptionChangedSub$.next(this.filterOptionInit);
    }
  }
}
