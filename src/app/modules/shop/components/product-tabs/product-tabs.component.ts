import { Component, Input } from '@angular/core';
import { Product, ProductFeaturesSection} from '../../../../shared/interfaces/product';
import { specification } from '../../../../../data/shop-product-spec';
import { reviews } from '../../../../../data/shop-product-reviews';
import { Review } from '../../../../shared/interfaces/review';



import { PimalionCloudService } from 'src/app/shared/api/pimalion-cloud.service';
import { ProductItem } from '../../../../shared/api/pimalion-cloud.service';

@Component({
    selector: 'app-product-tabs',
    templateUrl: './product-tabs.component.html',
    styleUrls: ['./product-tabs.component.scss']
})
export class ProductTabsComponent {
    @Input() withSidebar = false;
    @Input() tab: 'description'|'specification'|'reviews'|'documents'|'price' = 'description';
    @Input() product: Product;


    specification: ProductFeaturesSection[] = specification;
    reviews: Review[] = reviews;
    generateTitleText = "Générer les contenus";
    generateAttributesText = "Generer les contenus";

    isLoadDescriptionII_1 = false;

    constructor(private pimalionCloudService: PimalionCloudService) { }

    getAttributes(groupName: string) {
        return this.product.attributesPimalion.filter(data =>  data.groupName === groupName);
    }

    generateAttributes(groupName: string) {
            this.generateAttributesText = "G�n�ration en cours...";
            this.pimalionCloudService.getProductDetailPage_01(this.product.id)
              .subscribe({
                next:(data: any) => {this.product = new ProductItem(data);this.generateTitleText = "Generer les contenus"} //this.product.name = data.title
            });
    }

    getTitre() {
        this.isLoadDescriptionII_1 = true;
        this.generateTitleText = "Génération en cours...";

        this.pimalionCloudService.getProductDetailPage_01(this.product.id)
          .subscribe({
            next:(data: any) => {
                this.product = new ProductItem(data);
                this.generateTitleText = "Generer les contenus";
                this.isLoadDescriptionII_1 = false;
            } //this.product.name = data.title
        });
    }
/*
    getDescription() {
        this.product.description = "Génération de texte en cours...";
        this.pimalionCloudService.getProductDetailPage_01(this.product.id)
          .subscribe({
            next:(data: any) => this.product.description = data.description
        });
    }
*/
}
