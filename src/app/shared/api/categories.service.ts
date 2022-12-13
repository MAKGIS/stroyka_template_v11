import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Category } from '../interfaces/category';

export interface ICategoriesServiceInterface {
    reset(): void;
    complete(): void;
    next(categories: Category[]): void;
  }


@Injectable({
    providedIn: 'root'
})
export class CategoriesService implements ICategoriesServiceInterface {

  private CategoriesInit: Category[] = [
    { id:'1', type: 'shop', name: 'Sanitaire', slug: 'Sanitaire', path: '', image: '', items: 1, customFields: {}},
    { id:'1', type: 'shop', name: 'Electricité', slug: 'Electricité', path: '', image: '', items: 1, customFields: {}},
    { id:'1', type: 'shop', name: 'Outillage', slug: 'Outillage', path: '', image: '', items: 1, customFields: {}},
    { id:'1', type: 'shop', name: 'Chauffage', slug: 'Chauffage', path: '', image: '', items: 1, customFields: {}},
  ];

  public CategoriesChangedSub$ =  new BehaviorSubject<Category[]>(this.CategoriesInit);
  public CategoriesChanged$ = this.CategoriesChangedSub$.asObservable();
  public CategoriesChangedValue = this.CategoriesChangedSub$.getValue();

  constructor() {
  }
    isBrandsChanged$: Observable<Category[]>;
    isBrandsChangedValue: Category[];

  public reset() {
      this.CategoriesChangedSub$.next(this.CategoriesInit);
  }
  public complete() {
    this.CategoriesChangedSub$.complete();
  }
  public next(categories: Category[]) {
    if (categories) {
        console.log('*srv*** CategoriesService.next() categories -> %O', categories);
      this.CategoriesChangedSub$.next(categories);
    } else {
        this.CategoriesChangedSub$.next(this.CategoriesInit);
    }
  }
}
