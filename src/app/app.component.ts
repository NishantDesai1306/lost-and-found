import { Router } from '@angular/router';
import { Component, OnInit, Inject } from '@angular/core';
import { MatIconModule, MatDialogModule, MatChipsModule, MatMenu, MatMenuTrigger } from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import { UserService } from './shared/user.service';
import { AuthService } from './shared/auth.service';
// import {ChatzzServiceProvider, ChatzzService} from './shared/chatzz.service.provider';
import { NotificationCountService } from './dashboard/services/notification-count.service';
import { ChatzzService } from './shared/chatzz.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    username: string;
    notificationCount: number;

    constructor(
        private userService: UserService,
        private authService: AuthService,
        private router: Router,
        @Inject(ChatzzService) private chatzzService,
        private notificationCountService: NotificationCountService) {}

    logout() {
      this.authService.logout()
      .subscribe((response) => {
          if (response.status) {
              this.router.navigateByUrl('/login');
          } else {
              console.error('error occurred while logging out', response.reason);
          }
      }, (err) => {
          console.log(err);
      });

      this.chatzzService.disconnect();
    }

    ngOnInit() {
        this.userService
            .getUser()
            .subscribe((newUser) => {
                this.username = newUser.getUsername();
                this.chatzzService.newMessage()
                .subscribe((message) => {
                    if (message.type === this.chatzzService.messageTypes.CHAT_USER_ADDED) {
                        const connectedUsers = newUser.getConnectedUsers();
                        connectedUsers.push(message.data);
                        newUser.setConnectedUsers(connectedUsers);
                    }
                });
            });

        this.notificationCountService.getSubscription()
        .subscribe((newCount) => {
            this.notificationCount = newCount;
        });

    }
}
