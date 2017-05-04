import { Response } from '@angular/http';
import { ItemService } from './../../../shared/item.service';
import { Component, OnInit, EventEmitter, NgZone, Inject } from '@angular/core';
import { NgUploaderOptions, UploadedFile } from 'ngx-uploader';
import { NotificationService } from '../../../shared/notification.service';
import { MdDialogRef } from '@angular/material';

@Component({
    templateUrl: './create-item.component.html'
})
export class CreateItemComponent implements OnInit {

    item = {
        title: '',
        description: ''
    };

    titleError = '';
    descriptionError = '';
    uploadError = '';

    inputUploadEvent: EventEmitter<string>;
    uploaderOptions: NgUploaderOptions;
    uploadProgress: number;
    sizeLimit: number = 5 * 1024 * 1024;
    creating = false;
    previewData = [];
    imageUploadIds = [];

    constructor(
        @Inject(NgZone)private zone: NgZone,
        private itemService: ItemService,
        private notificationService: NotificationService,
        private dialogRef: MdDialogRef<CreateItemComponent>
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

                    if (this.imageUploadIds.length === this.previewData.length && !this.creating) {
                        self.uploadProgress = 0;
                        this.creating = true;
                        this.itemService.createItem(this.item.title, this.item.description, this.imageUploadIds)
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

    handlePreviewData(data: any) {
        this.previewData.push(data);
    }

     createItem() {
        this.titleError = this.descriptionError = '';

         if (!this.item.title) {
             this.titleError = 'Title can`t be empty';
         }
         if (!this.item.description) {
             this.descriptionError = 'Description can`t be empty';
         }
         if (this.previewData && !this.previewData.length) {
             return this.notificationService.createSimpleNotification('Aleast one image is required');
         }


         if (this.titleError || this.descriptionError) {
             return;
         }

        this.inputUploadEvent.emit('startUpload');
     }
}