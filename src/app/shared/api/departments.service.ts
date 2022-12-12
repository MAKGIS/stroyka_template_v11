import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Brand } from '../interfaces/brand';

export interface IDepartmentsServiceInterface {
    reset(): void;
    complete(): void;
    next(brands: Brand[]): void;
  }



@Injectable({
    providedIn: 'root'
})
export class DepartmentsService implements IDepartmentsServiceInterface {

  private DepartmentsInit: Brand[] = [
    { id:'1', image: '', name: 'LEGRAND', slug: 'LEGRAND', count: 111},
    { id:'2', image: '',  name: 'ARNOULD', slug: 'ARNOULD',  count: 222},
    { id:'3', image: '',  name: 'BTICINO', slug: 'BTICINO', count: 333},
    { id:'4', image: '',  name: 'PLANET WATTOHM', slug: 'PLANET WATTOHM', count: 444}
  ];

  public DepartmentsChangedSub$ =  new BehaviorSubject<Brand[]>(this.DepartmentsInit);
  public DepartmentsChanged$ = this.DepartmentsChangedSub$.asObservable();
  public DepartmentsChangedValue = this.DepartmentsChangedSub$.getValue();

  constructor() {
  }


  public reset() {
      this.DepartmentsChangedSub$.next(this.DepartmentsInit);
  }
  public complete() {
    this.DepartmentsChangedSub$.complete();
  }
  public next(departments: Brand[]) {
    if (departments) {
        console.log('*srv*** DepartmentsService.next() departments -> %O', departments);
      this.DepartmentsChangedSub$.next(departments);
    } else {
        this.DepartmentsChangedSub$.next(this.DepartmentsInit);
    }
  }
}
