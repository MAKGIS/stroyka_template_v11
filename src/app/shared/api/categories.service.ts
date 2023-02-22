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
    { parents: null, children: null, id:'AC_7/', type: 'shop', name: 'Aciers', slug: 'Aciers', path: '', image: '', items: 1, customFields: {}},
    { parents: null, children: null, id:'DE_2/', type: 'shop', name: 'Décoration', slug: 'Electricité', path: '', image: '', items: 1, customFields: {}},
    { parents: null, children: null, id:'EL_3/', type: 'shop', name: 'Electricité', slug: 'Outillage', path: '', image: '', items: 1, customFields: {}},
    { parents: null, children: null, id:'EP_1/', type: 'shop', name: 'EPI - Protection - Hygiène - Sécurité', slug: 'Chauffage', path: '', image: '', items: 1, customFields: {}},
    { parents: null, children: null, id:'IN_4/', type: 'shop', name: 'Industrie', slug: 'Chauffage', path: '', image: '', items: 1, customFields: {}},
    { parents: null, children: null, id:'OU_5/', type: 'shop', name: 'Outils pro & fournitures industrielles', slug: 'Chauffage', path: '', image: '', items: 1, customFields: {}},
    { parents: null, children: null, id:'SA_1/', type: 'shop', name: 'Sanitaire - Chauffage', slug: 'Chauffage', path: '', image: '', items: 1, customFields: {}},
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
