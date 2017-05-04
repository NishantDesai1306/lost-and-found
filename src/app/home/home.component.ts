import { UserService } from './../shared/user.service';
import { AuthSerivce } from './../shared/auth.service';
import {Component} from '@angular/core';

@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})
export class HomeComponent {
    private isUserLoggedIn: boolean;

    constructor(private authService: AuthSerivce) {}

    ngOnInit() {
        this.isUserLoggedIn = this.authService.isUserLoggedIn();
    }
 }