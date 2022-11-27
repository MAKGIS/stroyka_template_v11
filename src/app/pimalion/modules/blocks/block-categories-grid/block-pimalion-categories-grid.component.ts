import { Component, Input } from '@angular/core';

import { PimalionCloudService } from 'src/app/shared/api/pimalion-cloud.service';


import { Category } from 'src/app/shared/interfaces/category'; // '../../../interfaces/category-pimalion';

import { RootService } from 'src/app/shared/services/root.service';

@Component({
    selector: 'app-block-pimalion-categories-grid',
    templateUrl: './block-pimalion-categories-grid.component.html',
    styleUrls: ['./block-pimalion-categories-grid.component.scss']
})
export class BlockPimalionCategoriesGridComponent {
    @Input() header = '';
    @Input() layout: 'classic'|'compact' = 'classic';

    @Input() categories: Category[] = []; // Category[] = [];

    constructor(
        public pimalionCloudService: PimalionCloudService,
        public root: RootService,
    ) { }
}
