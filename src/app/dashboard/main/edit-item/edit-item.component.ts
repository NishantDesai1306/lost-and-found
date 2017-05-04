import { Response } from '@angular/http';
import { ItemService } from './../../../shared/item.service';
import { Component, OnInit, EventEmitter, NgZone, Inject } from '@angular/core';
import { NgUploaderOptions, UploadedFile } from 'ngx-uploader';
import { NotificationService } from '../../../shared/notification.service';
import { ConfirmService } from '../../../shared/confirm.service';
import { MdDialog, MdDialogRef } from '@angular/material';

@Component({
    templateUrl: './edit-item.component.html'
})
export class EditItemComponent implements OnInit {

    item;

    titleError = '';
    descriptionError = '';
    uploadError = '';

    inputUploadEvent: EventEmitter<string>;
    uploaderOptions: NgUploaderOptions;
    uploadProgress: number;
    sizeLimit: number = 5 * 1024 * 1024;
    updating = false;
    previewData = [];
    imageUploadIds = [];

    constructor(
        @Inject(NgZone)private zone: NgZone,
        private itemService: ItemService,
        private notificationService: NotificationService,
        private confirmService: ConfirmService,
        private dialogRef: MdDialogRef<EditItemComponent>
    ) {
        this.inputUploadEvent = new EventEmitter<string>();
     }

    ngOnInit() {
        this.uploaderOptions = new NgUploaderOptions({
            url: '/api/upload',
            filterExtensions: true,
            allowedExtensions: ['jpeg', 'jpg', 'png'],
            multiple: true,
            maxSize: this.sizeLimit,
            autoUpload: false,
            previewUrl: true,
        });
     }

     handleUpload(data: any) {
        const self = this;

        setTimeout(() => {
            this.zone
                .run(() => {
                    self.uploadProgress = data.progress.percent;

                    if (data && data.response) {
                        const responseObj = JSON.parse(data.response);
                        if (this.imageUploadIds.indexOf(responseObj.data) === -1) {
                            this.imageUploadIds.push(responseObj.data);
                        }
                    }

                    if (this.imageUploadIds.length === this.item.images.length + this.previewData.length && !this.updating) {
                        self.uploadProgress = 0;
                        this.updating = true;

                        this.itemService.updateItem(this.item._id, this.item.title, this.item.description, this.imageUploadIds)
                        .subscribe((serverResponse) => {
                            if (serverResponse.status) {
                                this.dialogRef.close();
                            }
                            else {
                                console.error(serverResponse.reason);
                            }
                        });
                    }
                });
        });
    }

    replaceSlashes(url: string) {
        return url.replace(/\\/g, '/');
    }

    handlePreviewData(data: any) {
        this.previewData.push(data);
    }

    deleteImage(index) {
        if(this.item.images && this.item.images.length === 1) {
            return this.notificationService.createSimpleNotification('Item should have atleast single image');
        }

        const image = this.item.images[index];
        this.confirmService.confirm('Confirm', 'Are you sure you want to remove this image ?')
        .subscribe((result) => {
            if (result) {
                this.itemService.removeImage(this.item, image).subscribe((res) => {
                    if (res.status) {
                        this.item.splice(index, 1);
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

        this.item.images.forEach((image) => {
            this.imageUploadIds.push(image._id.toString());
        });

        if (this.previewData && !this.previewData.length) {
            this.itemService.updateItem(this.item._id, this.item.title, this.item.description, this.imageUploadIds)
            .subscribe((serverResponse) => {
                if (serverResponse.status) {
                    console.log('completed');
                }
                else {
                    console.error(serverResponse.reason);
                }
            });
        }
        else {
            this.inputUploadEvent.emit('startUpload');
        }

    }
}