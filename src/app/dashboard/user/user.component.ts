import { Component, OnInit, NgZone, Inject, EventEmitter, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
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

    uploadPromise: Promise<string> = Promise.resolve('');

    loading = false;

    constructor(
        private userService: UserService,
        @Inject(NgZone)private zone: NgZone,
        private router: Router,
        private notificationService: NotificationService
    ) {}

    ngOnInit() {
        const watcher = this
            .userService
            .getUser()
            .subscribe(user => {
                this.user = Object.assign({}, user);
            });

        this.watchers.push(watcher);
    }

    ngOnDestroy() {
        this.watchers.forEach((watcher) => {
            watcher.unsubscribe();
        });
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

    handlePreviewData(data: any) {
        this.previewData = data;
    }

    onUploadComplete([profilePicture]) {
        if (profilePicture.status) {
            this.userService.changeProfilePicture(profilePicture.data)
            .subscribe(() => {
                this.notificationService.createSimpleNotification('Profile Picture updated successfully');
            });
        }
	}
}
