import { Component, Input } from '@angular/core';
import { Product, ProductFeaturesSection} from '../../../../shared/interfaces/product';
import { specification } from '../../../../../data/shop-product-spec';
import { reviews } from '../../../../../data/shop-product-reviews';
import { Review } from '../../../../shared/interfaces/review';

import { PimalionCloudService } from 'src/app/shared/api/pimalion-cloud.service';

@Component({
    selector: 'app-product-tabs',
    templateUrl: './product-tabs.component.html',
    styleUrls: ['./product-tabs.component.scss']
})
export class ProductTabsComponent {
    @Input() withSidebar = false;
    @Input() tab: 'description'|'specification'|'reviews'|'documents' = 'description';

    @Input() product: Product;


    specification: ProductFeaturesSection[] = specification;
    reviews: Review[] = reviews;

    constructor(private pimalionCloudService: PimalionCloudService
        ) { }

    getAttributes(groupName: string) {
        return this.product.attributesPimalion.filter(data =>  data.groupName === groupName);
    }

    getTitre() {
        this.pimalionCloudService.getProductDetailPage_01(this.product.id)
          .subscribe({next:(data: any) => this.product.description = data.description}); // ???
    }

}
