import { Response } from '@angular/http';
import { ItemService } from './../../../shared/item.service';
import { Component, OnInit, EventEmitter, NgZone, Inject } from '@angular/core';

@Component({
    templateUrl: './view-item.component.html'
})
export class ViewItemComponent implements OnInit {

    item: any;
    itemImages = [];

    constructor(private itemService: ItemService) {}

    ngOnInit() {
        this.itemImages = this.item.images.map((image) => {
            return {
                thumbnail: this.replaceSlashes(image.path),
                image: this.replaceSlashes(image.path)
            };
        });
    }

    replaceSlashes(url: string) {
        return url.replace(/\\/g, '/');
    }
}
