import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Brand } from '../interfaces/brand';

export interface BrandsServiceInterface {
    isBrandsChanged$: Observable<Brand[]>;
    isBrandsChangedValue: Brand[];
    reset(): void;
    complete(): void;
    next(brands: Brand[]): void;
  }



@Injectable({
    providedIn: 'root'
})
export class BrandsService implements BrandsServiceInterface {

  private BrandsInit: Brand[] = [
    { id:'1', image: '', name: 'LEGRAND', slug: 'LEGRAND', count: 111},
    { id:'2', image: '',  name: 'ARNOULD', slug: 'ARNOULD',  count: 222},
    { id:'3', image: '',  name: 'BTICINO', slug: 'BTICINO', count: 333},
    { id:'4', image: '',  name: 'PLANET WATTOHM', slug: 'PLANET WATTOHM', count: 444}
  ];

  public BrandsChangedSub$ =  new BehaviorSubject<Brand[]>(this.BrandsInit);
  public BrandsChanged$ = this.BrandsChangedSub$.asObservable();
  public BrandsChangedValue = this.BrandsChangedSub$.getValue();

  constructor() {
  }
    isBrandsChanged$: Observable<any[]>;
    isBrandsChangedValue: any[];

  public reset() {
      this.BrandsChangedSub$.next(this.BrandsInit);
  }
  public complete() {
    this.BrandsChangedSub$.complete();
  }
  public next(brands: Brand[]) {
    if (brands) {
        console.log('*srv*** BrandsService.next() brands -> %O', brands);
      this.BrandsChangedSub$.next(brands);
    } else {
        this.BrandsChangedSub$.next(this.BrandsInit);
    }
  }
}
