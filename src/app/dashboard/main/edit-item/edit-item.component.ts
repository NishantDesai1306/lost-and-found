import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {Component, NgZone, Inject} from '@angular/core';

import {ItemService} from './../../../shared/item.service';
import {NotificationService} from '../../../shared/notification.service';
import {ConfirmService} from '../../../shared/confirm.service';
import { log } from 'util';

@Component({templateUrl: './edit-item.component.html'})
export class EditItemComponent {

    item;

    titleError = '';
    descriptionError = '';
    uploadError = '';

    uploadImages = false;

    constructor(
        private itemService: ItemService,
        private notificationService: NotificationService,
        private confirmService: ConfirmService,
        private dialogRef: MatDialogRef < EditItemComponent >,
        @Inject(MAT_DIALOG_DATA) data
    ) {
        this.item = data.item;
    }

    replaceSlashes(url: string) {
        return url.replace(/\\/g, '/');
    }

    cancel() {
        this.dialogRef.close();
    }

    deleteImage(imageId) {
        if (this.item.images && this.item.images.length === 1) {
            return this.notificationService.createSimpleNotification('Item should have at least single image');
        }

        this.confirmService
            .confirm('Confirm', 'Are you sure you want to remove this image ?')
            .subscribe((result) => {
                if (result) {
                    this.itemService
                        .removeImage(this.item._id, imageId)
                        .subscribe((res: any) => {
                            if (res.status) {
                                this.item.images = this.item.images.filter(({id}) => id !== imageId);
                            }
                        });
                }
            });
    }

    editItem() {
        this.titleError = this.descriptionError = '';

        if (!this.item.title) {
            this.titleError = 'Title can`t be empty';
        }
        if (!this.item.description) {
            this.descriptionError = 'Description can`t be empty';
        }

        if (this.titleError || this.descriptionError) {
            return;
        }

        this.uploadImages = true;
    }

    saveItem(responses) {
        const newImageIds = responses.map(({data}) => data);
        const existingImageIds = this.item.images.map(({id}) => id);
        const imageIds = existingImageIds.concat(newImageIds);

        if (imageIds && imageIds.length) {
            this.itemService
                .updateItem(this.item._id, this.item.title, this.item.description, imageIds)
                .subscribe((serverResponse: any) => {
                    if (serverResponse.status) {
                        this.dialogRef.close(true);
                    } else {
                        console.error(serverResponse.reason);
                    }
                });
        }
    }
}
