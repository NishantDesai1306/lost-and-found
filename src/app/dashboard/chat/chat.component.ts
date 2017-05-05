import { NotificationCountService } from './../services/notification-count.service';
import { ChatzzService } from './../../shared/chatzz.service.provider';
import { Router, ActivatedRoute } from '@angular/router';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, ContentChild, ViewChild, Inject, OnDestroy } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { MdSidenavModule, MdSidenav } from '@angular/material';
import { BehaviorSubject } from 'rxjs/Rx';

@Component({
    templateUrl: './chat.component.html'
})
export class ChatComponent implements OnInit, OnDestroy {

    watchers: Subscription[] = [];

    userId: string;
    username: string;
    screenHeight: number;
    extraMargin = 65;

    companionUserBehaviourSubject: BehaviorSubject<string>;
    chatData = {
        companionUser: {
            _id: ''
        },
        messages: [],
        newMessage: '',
        lastUserIdWithImage: ''
    };
    connectedUsers = [];

    @ViewChild(MdSidenav) sideNav: MdSidenav;

    constructor(
        private userSerivce: UserService,
        private media: ObservableMedia,
        private route: ActivatedRoute,
        @Inject(ChatzzService) private chatzzService,
        private notificationCountService: NotificationCountService
    ) {
        this.userSerivce = userSerivce;
        this.screenHeight = window.innerHeight - this.extraMargin;
        this.companionUserBehaviourSubject = new BehaviorSubject(null);
    }

    isScreeSizeLg() {
        return this.media.isActive('lg');
    }

    ngOnInit() {
        let watcher;

        watcher = this.userSerivce
            .getUser()
            .subscribe((newUser) => {
                this.userId = newUser.getId();
                this.username = newUser.getUsername();
                this.connectedUsers = newUser.getConnectedUsers();

                watcher = this.route.queryParams.subscribe((data) => {
                    if (data && data.user) {
                        const requiredUser = this.connectedUsers.find((connectedUser) => {
                            return data.user === connectedUser._id;
                        });

                        this.selectCompanionUser(requiredUser);
                    }
                });
            });
        this.watchers.push(watcher);


        this.notificationCountService.setCount(0);
        this.notificationCountService.setUpdateFlag(false);

        if (this.isScreeSizeLg()) {
            this.sideNav.open();
        }

        this.companionUserBehaviourSubject.subscribe((companionUserObj: any) => {
            if (!companionUserObj) {
                return;
            }

            this.chatData.companionUser = companionUserObj;
            this.loadMessages(this.chatData.companionUser._id);

        });

        watcher = this.chatzzService.newMessage().subscribe((message) => {
            switch(message.type) {
                case this.chatzzService.messageTypes.OLD_MESSAGES: {
                    message.data.map((oldMessage) => {
                        if (oldMessage.to.user._id === this.userId && oldMessage.status !== this.chatzzService.messageStatus.READ) {
                            this.chatzzService.markMessageRead(oldMessage._id);
                        }
                    });

                    this.chatData.messages = message.data;

                    this.chatData.messages.forEach((messageObj) => {
                        if (messageObj.from.user._id !== this.chatData.lastUserIdWithImage) {
                            this.chatData.lastUserIdWithImage = messageObj.from.user._id;
                            messageObj.showImage = true;
                        }
                    });

                    break;
                }
                case this.chatzzService.messageTypes.NEW_MESSAGE: {
                    if (message.data.to.user._id === this.userId && 
                        message.data.status !== this.chatzzService.messageStatus.READ && 
                        this.chatData.companionUser._id === message.data.from.user._id) {

                        this.chatzzService.markMessageRead(message.data._id);
                    }

                    if(message.data.from.user._id !== this.chatData.lastUserIdWithImage) {
                        message.data.showImage = true;
                        this.chatData.lastUserIdWithImage = message.data.from.user._id;
                    }

                    this.chatData.messages.push(message.data);
                    break;
                }
                case this.chatzzService.messageTypes.MESSAGE_STATUS_CHANGED:
                {
                    this.chatData.messages.forEach((messageObj) => {
                        if(messageObj._id === message.data.message._id) {
                            messageObj = Object.assign(messageObj, message.data.message);
                        }
                    });
                    break;
                }
                case this.chatzzService.messageTypes.CHAT_USER_STATUS_CHANGED: {
                    this.connectedUsers.forEach((connectedUser) => {
                        if (connectedUser._id === message.data.user._id) {
                            connectedUser.status = message.data.status;
                            connectedUser.lastOnline = message.data.lastOnline;
                        }
                    });
                }
            }
        });
        this.watchers.push(watcher);

        watcher = this.media.subscribe((change: MediaChange) => {
            this.screenHeight = window.innerHeight - this.extraMargin;

            if (this.isScreeSizeLg()) {
                this.sideNav.open();
            }
            else {
                this.sideNav.close();
            }
        });
        this.watchers.push(watcher);
    }

    ngOnDestroy() {
        this.notificationCountService.setUpdateFlag(true);

        this.watchers.forEach((watcher) => {
            watcher.unsubscribe();
        });
    }

    selectCompanionUser(user: string) {
        this.companionUserBehaviourSubject.next(user);
    }

    sendMessage(message: string) {
        if(message) {
            this.chatzzService.sendMessage(this.chatData.companionUser._id, message);
        }
    }
    loadMessages(userId) {
        this.chatzzService.getChatMessages(userId);
    }
    getMessageAlignment(messageObj) {
        return (messageObj.from.user._id === this.userId ? "end" : "start") + " start"; 
    }
    getMessageStatusIcon(messageObj) {
        switch(messageObj.status) {
            case this.chatzzService.messageStatus.NOT_SENT: return 'done';
            case this.chatzzService.messageStatus.SENT:
            case this.chatzzService.messageStatus.READ: return 'done_all';
        }
    }
    isMessageRead(messageObj) {
        return messageObj.status === this.chatzzService.messageStatus.READ;
    }

    replaceSlashes(url: string) {
        return url.replace(/\\/g, '/');
    }
}
