import { NotificationCountService } from './../services/notification-count.service';
import { ChatzzService } from './../../shared/chatzz.service.provider';
import { ViewItemComponent } from './view-items/view-item.component';
import { EditItemComponent } from './edit-item/edit-item.component';
import { ItemService } from './../../shared/item.service';
import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MdDialog } from '@angular/material';
import {Subscription} from 'rxjs/Subscription';
import {MediaChange, ObservableMedia} from '@angular/flex-layout';
import { CreateItemComponent } from './create-item/create-item.component';
import { UserService } from '../../shared/user.service';
import { ConfirmService } from '../../shared/confirm.service';

@Component({
    templateUrl: './main.component.html'
})
export class MainComponent implements OnInit, OnDestroy {

    watchers: Subscription[] = [];

    user;

    leftItems = [];
    rightItems = [];
    loadingItems = false;
    copy = {
        leftItems: this.leftItems,
        rightItems: this.rightItems
    };

    constructor(
        private dialog: MdDialog,
        private media: ObservableMedia,
        private itemService: ItemService,
        private userService: UserService,
        private confirmService: ConfirmService,
        @Inject(ChatzzService) private chatzzService,
        private notificationCountService: NotificationCountService
    ) {
        const singleLaneModes = ['sm', 'xs'];

        const watcher = this.media.subscribe((change: MediaChange) => {
            if (singleLaneModes.indexOf(change.mqAlias) > -1) {
                this.leftItems = this.copy.leftItems.concat(this.copy.rightItems);
            } else {
                this.leftItems = this.copy.leftItems;
                this.rightItems = this.copy.rightItems;
            }
        });

        this.watchers.push(watcher);
    }

    ngOnInit() {
        let watcher;
        this.loadingItems = true;

        watcher = this.itemService.getItems().subscribe((res) => {
            if (res.status) {
                const items = res.data;
                this.copy.rightItems = this.rightItems = items.splice(0, items.length / 2);
                this.copy.leftItems = this.leftItems = items;
                this.loadingItems = false;
            } else {
                console.error(res.reason);
            }
        });
        this.watchers.push(watcher);

        watcher = this.userService.getUser().subscribe((user) => {
            this.user = user;

            if(user.getId()) {
                this.chatzzService.connect(user.getId());
            }
        });
        this.watchers.push(watcher);

        watcher = this.chatzzService.newMessage().subscribe((message) => {
            switch(message.type) {
                case this.chatzzService.messageTypes.USER_DETAILS: {
                    const allMissedMessages = (<any>Object).values(message.data.missedMessages);
                    const allMissedMessagesCount = allMissedMessages.reduce((partialSum, messageSet) => {
                        return partialSum + messageSet.length;
                    }, 0);

                    this.notificationCountService.setCount(allMissedMessagesCount);
                    this.user.setConnectedUsers(message.data.connectedUsers);
                    break;
                }
                case this.chatzzService.messageTypes.NEW_MESSAGE: {
                    this.notificationCountService.addToCount(1);
                    break;
                }
            }
        });

        this.watchers.push(watcher);
    }

    ngOnDestroy() {
        this.watchers.forEach((watcher) => {
            watcher.unsubscribe();
        });
    }

    createItem() {
        this.dialog.open(CreateItemComponent, {
            width: '600px',
        });
    }
}