import { UserService } from './../shared/user.service';
import { AuthService } from './../shared/auth.service';
import { Component, OnInit } from '@angular/core';
@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
    private isUserLoggedIn: boolean;

    constructor(private authService: AuthService) {}

    ngOnInit() {
        this.isUserLoggedIn = this.authService.isUserLoggedIn();
    }
}
