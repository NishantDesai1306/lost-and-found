import { UserService } from './../shared/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
    templateUrl: './dashboard.Component.html'
})
export class DashboardComponent implements OnInit {

    username: string;

    constructor(private userService: UserService) {}

    ngOnInit() {
        this.userService
            .getUser()
            .subscribe((newUser) => {
                this.username = newUser.getUsername();
            });
    }
}
