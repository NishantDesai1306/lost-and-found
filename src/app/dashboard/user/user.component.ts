import { Component, OnInit, NgZone, Inject, EventEmitter, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {NgUploaderOptions, UploadedFile, NgUploaderService} from 'ngx-uploader';
import { ModalDirective } from 'ng2-bootstrap';
import * as objectFitImages from 'object-fit-images';

import {UserService} from './../../shared/user.service';
import { NotificationService } from '../../shared/notification.service';
import { Subscription } from 'rxjs/Subscription';

objectFitImages('img.avatar-100');

@Component({templateUrl: './user.component.html'})
export class UserComponent implements OnInit, OnDestroy {

    watchers: Subscription[] = [];

    temp = 50;
    user: any;
    previewData: any;
    error = '';

    inputUploadEvent: EventEmitter<string>;
    uploaderOptions: NgUploaderOptions;
    uploadProgress: number;
    sizeLimit: number = 5*1024*1024;
    uploadPromise: Promise<string>;

    loading = false;

    constructor(
        private userService: UserService,
        @Inject(NgZone)private zone: NgZone,
        private router: Router,
        private notificationService: NotificationService
    ) {
        this.uploadPromise = Promise.resolve("");
        this.inputUploadEvent = new EventEmitter<string>();
    }

    saveChanges() {
        this.error = '';

        if (!this.user.username) {
            return this.error = 'Username can`t be empty';
        }
        if (!this.user.email) {
            return this.error = 'Email can`t be empty';
        }

        const watcher = this.userService
            .changeDetails(this.user.username, this.user.email)
            .subscribe(res => {
                if (res.status) {
                    this.loading = false;
                    this.router.navigateByUrl('/dashboard');
                    this.notificationService.createSimpleNotification('User Details changed successfully');
                } else {
                    this.error = res.reason;
                }
            });

        this.watchers.push(watcher);
    }

    handleUpload(data: any) {
        setTimeout(() => {
            this.zone
                .run(() => {
                    this.uploadProgress = data.progress.percent;
                    if (data && data.response && !this.loading) {
                        const serverResponse = JSON.parse(data.response);
                        this.uploadProgress = 0;
                        if (serverResponse.status) {
                            this.userService.changeProfilePicture(serverResponse.data).subscribe(() => {});
                            this.notificationService.createSimpleNotification('Profile Picture changed successfully');
                        }
                        else {
                            console.error(serverResponse.reason);
                        }
                    }
                });
        });
    }

    beforeUpload(uploadingFile: UploadedFile): void {
        if (uploadingFile.size > this.sizeLimit) {
            uploadingFile.setAbort();
            this.error = 'Can\'t upload file with size more than 5MB';
        }
    }

    handlePreviewData(data: any) {
        this.previewData = data;
    }

    ngOnInit() {
        const watcher = this
            .userService
            .getUser()
            .subscribe(user => {
                this.user = Object.assign({}, user);
            });

        this.watchers.push(watcher);

        this.uploaderOptions = new NgUploaderOptions({
            url: '/api/upload',
            filterExtensions: true,
            allowedExtensions: ['jpeg', 'jpg', 'png'],
            autoUpload: true,
            maxUploads: 1,
            previewUrl: true,
        });
    }

    ngOnDestroy() {
        this.watchers.forEach((watcher) => {
            watcher.unsubscribe();
        });
    }
}