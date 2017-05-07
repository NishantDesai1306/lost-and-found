import {AuthSerivce} from './../shared/auth.service';

import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

@Component({selector: 'login', templateUrl: 'login.component.html'})
export class LoginComponent implements OnInit {
    error: string;
    user = {
        email: '',
        password: ''
    };
    rememberMe = false;

    usernameError = '';
    passwordError = '';

    constructor(
        private authService: AuthSerivce,
        private router: Router,
        private route: ActivatedRoute) {}

    login() {
        const self = this;

        self.usernameError = !self.user.email ? 'Email can`t be empty' : '';
        self.passwordError = !self.user.password ? 'Password can`t be empty' : '';

        if (self.usernameError || self.passwordError) {
            return;
        }

        self.authService
            .login(self.user.email, self.user.password, self.rememberMe)
            .subscribe((isSuccessfull) => {
                if (isSuccessfull) {
                    self.router.navigateByUrl('/dashboard')
                } else {
                    console.error('error occurred while login');
                }
            }, (err) => {
                console.log(err);
                self.error = err;
            });
    }

    ngOnInit() {
        var self = this;

        self.route
            .queryParams
            .subscribe(params => {
                self.error = params['errorMessage'] || '';
            });

        self.authService.getUserDetails().subscribe(isSuccessfull => {
            if(isSuccessfull) {
                self.router.navigateByUrl('/dashboard');
            }
        });
    }
}