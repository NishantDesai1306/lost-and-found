import {AuthService} from './../shared/auth.service';

import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { NotificationService } from '../shared/notification.service';

@Component({selector: 'login', templateUrl: 'login.component.html'})
export class LoginComponent implements OnInit {
    error: string;
    user = {
        email: 'nishant',
        password: 'nishant'
    };
    rememberMe = false;

    usernameError = '';
    passwordError = '';

    constructor(
        private authService: AuthService,
        private router: Router,
        private route: ActivatedRoute,
        private notificationService: NotificationService) {}

    login() {
        this.usernameError = !this.user.email ? 'Email can`t be empty' : '';
        this.passwordError = !this.user.password ? 'Password can`t be empty' : '';

        if (this.usernameError || this.passwordError) {
            return;
        }

        this.authService
            .login(this.user.email, this.user.password, this.rememberMe)
            .subscribe((isSuccessful) => {
                if (isSuccessful) {
                    this.router.navigateByUrl('/dashboard');
                } else {
                    console.error('error occurred while login');
                }
            }, (err) => {
                this.notificationService.createSimpleNotification('Invalid Username or Password', 3000);
                this.error = err;
            });
    }

    ngOnInit() {
        this.authService.getUserDetails().subscribe(isSuccessful => {
            if (isSuccessful) {
                this.router.navigateByUrl('/dashboard');
            } else {
                this.route
                .queryParams
                .subscribe(params => {
                    const errorMessage = params['errorMessage'];

                    if (errorMessage) {
                        this.notificationService.createSimpleNotification(errorMessage, 5000);
                    }
                });
            }
        });
    }
}