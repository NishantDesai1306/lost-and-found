import { Http, Response } from '@angular/http';
import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

class User {
    private _id: string;
    private username: string;
    private email: string;
    private profilePictureUrl: string;
    private chatData: any;

    constructor(_id: string, username: string, email: string, profilePicture: string) {
        this._id = _id;
        this.username = username;
        this.email = email;
        this.profilePictureUrl = profilePicture;
        this.chatData = {};
    }

    setConnectedUsers(users) {
        this.chatData.connectedUsers = users;
    }

    getConnectedUsers() {
        return this.chatData.connectedUsers;
    }

    getId() {
        return this._id;
    }
    getUsername(): string {
        return this.username || null;
    };
    getEmail(): string {
        return this.email || null;
    }
    getProfilePictureUrl(): string {
        return this.profilePictureUrl || null;
    }
}

@Injectable()
export class UserService {
    userBehaviousSubject: BehaviorSubject<User>;
    apiUrl = '/api/user';

    constructor(private http: Http) {
        this.userBehaviousSubject = new BehaviorSubject<User>(new User(null, null, null, null));
    }

    setUser(id, username, email, profilePciture) {
        const user: User = new User(id, username, email, profilePciture);
        this.userBehaviousSubject.next(user);
    }

    getUser(): Observable<User> {
        return this
            .userBehaviousSubject
            .asObservable()
            .share()
            .distinctUntilChanged();
    };

    changeDetails(username, email) {
        const self = this;
        const changeDetailsUrl = this.apiUrl + '/change-details';

        return self.http.post(changeDetailsUrl, {username, email})
            .map((res: Response) => res.json())
            .map((res) => {
                if (res.status) {
                    self.setUser(res.data._id, res.data.username, res.data.email, res.data.profilePictureUrl);
                }
                return res;
            })
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    changeProfilePicture(uploadId) {
        const self = this;
        const changeProfilePictureUrl = this.apiUrl + '/change-profile-picture';

        return self.http.post(changeProfilePictureUrl, {profilePicture: uploadId})
            .map((res:Response) => {
                return res.json();
            })
            .map((res) => {
                if(res && res.status) {
                    self.setUser(res.data._id, res.data.username, res.data.email, res.data.profilePictureUrl);
                }
                return res;
            })
            .catch((error:any) => Observable.throw(error || 'Server error'));
    }

    changePassword(oldPassword, newPassword) {
        const self = this;
        const changePasswordUrl: string = this.apiUrl + '/change-password';

        return self.http.post(changePasswordUrl, {oldPassword, newPassword})
            .map((res:Response) => res.json())
            .map((res) => {
                return res;
            })
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
}