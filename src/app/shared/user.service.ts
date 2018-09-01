import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
        this.chatData = {
            connectedUsers: [],
            missedMessages: {}
        };
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
    getChatData(): any {
        return this.chatData;
    }
}

@Injectable({
    providedIn: 'root'
})
export class UserService {
    userBehaviourSubject: BehaviorSubject<User>;
    apiUrl = '/api/user';

    constructor(private http: HttpClient) {
        this.userBehaviourSubject = new BehaviorSubject<User>(new User(null, null, null, null));
    }

    setUser(id, username, email, profilePicture) {
        const user: User = new User(id, username, email, profilePicture);
        this.userBehaviourSubject.next(user);
    }

    getUser(): Observable<User> {
        return this
            .userBehaviourSubject
            .asObservable()
            .share()
            .distinctUntilChanged();
    };

    changeDetails(username, email) {
        const changeDetailsUrl = this.apiUrl + '/change-details';

        return this.http.post(changeDetailsUrl, {username, email})
            // .map((res: any) => res.json())
            .map((res: any) => {
                if (res.status) {
                    this.setUser(res.data._id, res.data.username, res.data.email, res.data.profilePictureUrl);
                }
                return res;
            })
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }

    changeProfilePicture(uploadId) {
        const changeProfilePictureUrl = this.apiUrl + '/change-profile-picture';

        return this.http.post(changeProfilePictureUrl, {profilePicture: uploadId})
            .map((res: any) => {
                if (res && res.status) {
                    this.setUser(res.data._id, res.data.username, res.data.email, res.data.profilePictureUrl);
                }
                return res;
            })
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }

    changePassword(oldPassword, newPassword) {
        const changePasswordUrl: string = this.apiUrl + '/change-password';

        return this.http.post(changePasswordUrl, {oldPassword, newPassword})
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }
}
