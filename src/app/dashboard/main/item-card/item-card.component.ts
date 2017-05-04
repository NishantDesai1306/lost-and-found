import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { EditItemComponent } from './../edit-item/edit-item.component';
import { ViewItemComponent } from './../view-items/view-item.component';
import { Response } from '@angular/http';
import { Component, OnInit, EventEmitter, NgZone, Inject, Input, OnDestroy } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { MdDialog } from '@angular/material';
import { ConfirmService } from '../../../shared/confirm.service';
import { ItemService } from '../../../shared/item.service';
import { ChatzzService } from '../../../shared/chatzz.service.provider';

@Component({
    templateUrl: './item-card.component.html',
    selector: 'app-item-card'
})
export class ItemCardComponent implements OnInit, OnDestroy {

    watchers: Subscription[] = [];

    user: any;
    imageLoaded = false;
    @Input() item: any;

    constructor(
        private userService: UserService,
        private dialog: MdDialog,
        private confirmService: ConfirmService,
        private itemService: ItemService,
        private router: Router,
        @Inject(ChatzzService) private chatzzService
    ) {}

    getUserAvatarStyle() {
        return {
            'background-image': 'url(' + this.replaceSlashes(this.item.owner.profilePicture.path) + ')',
            'background-size': 'cover'
        };
    }

    ngOnInit() {
        const watcher = this.userService
            .getUser()
            .subscribe((newUser) => {
                this.user = newUser;
            });
        this.watchers.push(watcher);
    }

    ngOnDestroy() {
        this.watchers.forEach((watcher) => {
            watcher.unsubscribe();
        })
    }

    imageLoadedSuccessfully() {
        this.imageLoaded = true;
    }

    replaceSlashes(url: string) {
        return url.replace(/\\/g, '/');
    }

    editItem() {
        const editItemDialogRef = this.dialog.open(EditItemComponent, {
            width: '600px',
            data: this.item
        });

        editItemDialogRef.componentInstance.item = this.item;
    }

    deleteItem() {
        this.confirmService.confirm('Delete Item',  `Are you sure you want to delete item ${this.item.title} ?`)
        .subscribe((res) => {
            if(res) {
                this.itemService.deleteItem(this.item)
                .subscribe((response) => {
                    console.log(response);
                });
            }
        });
    }

    viewItem() {
        const viewItemDialogRef = this.dialog.open(ViewItemComponent, {
            width: '600px'
        });

        viewItemDialogRef.componentInstance.item = this.item;
    }

    contactUser(userId) {
        const connectedUsers = this.user.getConnectedUsers();
        let isUserAlreadyConnected = false;

        for (let i = 0; i < connectedUsers.length; i++) {
            const connectedUser = connectedUsers[i];
            if (connectedUser._id === userId) {
                isUserAlreadyConnected = true;
                break;
            }
        }

        if (!isUserAlreadyConnected) {
            this.chatzzService.addChatUser(userId);
        }

        return this.router.navigateByUrl('/dashboard/chat?user=' + userId);
    }
}
