import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private username: string;
    private email: string;
    readonly authUrl = '/auth';
    private isLoggedIn = false;

    constructor(
        private http: HttpClient,
        private userService: UserService
    ) {}

    isUserLoggedIn(): boolean {
        return this.isLoggedIn;
    }

    login (email: string, password: string, rememberMe: boolean) {
        const self = this;
        const loginUrl: string = this.authUrl + '/login';

        return self.http.post(loginUrl, {email, password, rememberMe})
            .map((res: any) => res.json())
            .map((res) => {
                self.isLoggedIn = res.status;
                if (self.isLoggedIn) {
                    self.userService.setUser(res.data._id, res.data.username, res.data.email, res.data.profilePictureUrl);
                }
                return self.isLoggedIn;
            })
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    register(email: string, username: string, password: string) {
        const self = this;
        const loginUrl: string = this.authUrl + '/register';

        return self.http.post(loginUrl, {email, username, password})
            .map((res: any) => res.json())
            .map((res) => {
                self.isLoggedIn = res.status;
                if (self.isLoggedIn) {
                    self.userService.setUser(res.data._id, res.data.username, res.data.email, res.data.profilePictureUrl);
                }
                return self.isLoggedIn;
            })
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    logout() {
        const self = this;
        const logoutUrl: string = this.authUrl + '/logout';

        return self.http.post(logoutUrl, {})
            .map((res: any) => res.json())
            .map((res) => {
                if (res.status) {
                    self.isLoggedIn = false;
                    self.userService.setUser(null, null, null , null);
                }

                return res;
            })
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    getUserDetails() {
        const self = this;
        const getUserUrl = '/api/user/details';

        return self.http.get(getUserUrl)
            .map((res: any) => res.json())
            .map((res) => {
                if (res.status) {
                    self.isLoggedIn = true;
                    self.userService.setUser(res.data._id, res.data.username, res.data.email, res.data.profilePictureUrl);
                }

                return res.status;
            })
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
}
