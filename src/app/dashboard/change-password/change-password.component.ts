import { UserService } from './../../shared/user.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '../../shared/notification.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
    templateUrl: './change-password.component.html'
})
export class ChangePasswordComponent implements OnInit, OnDestroy {

    watchers: Subscription[] = [];

    user: any = {
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    };

    newPasswordError = '';
    newPasswordMatchError = '';
    oldPasswordError = '';

    constructor(private userService: UserService, private router: Router, private notificationService: NotificationService) {}

    changePassword() {
        this.oldPasswordError = '';
        this.newPasswordError = '';
        this.newPasswordMatchError = '';

        if (!this.user.oldPassword) {
            this.oldPasswordError = 'Old Password can`t be empty';
        }
        if (!this.user.newPassword) {
            this.newPasswordError = 'New Password can`t be empty';
        }
        if (this.user.newPassword !== this.user.confirmNewPassword) {
            this.newPasswordMatchError = 'New Password and Confirm New Password must match';
        }

        if (this.oldPasswordError || this.newPasswordError || this.newPasswordMatchError) {
            return;
        }

        this.userService
            .changePassword(this.user.oldPassword, this.user.newPassword)
            .subscribe((res: any) => {
                if (res.status) {
                    this.notificationService.createSimpleNotification('Password Changed Succesfully');
                    this.router.navigateByUrl('/dashboard/user');
                } else {
                    this.oldPasswordError = res.reason;
                }
            });
    }

    ngOnInit() {
        const watcher = this.userService.getUser().subscribe(user => {
            this.user = user;
        });

        this.watchers.push(watcher);
     }

     ngOnDestroy() {
         this.watchers.forEach((watcher) => {
             watcher.unsubscribe();
         });
     }
}
