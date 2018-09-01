import {ItemService} from './../../../shared/item.service';
import {Component, NgZone, Inject} from '@angular/core';
import {NotificationService} from '../../../shared/notification.service';
import {MatDialogRef} from '@angular/material';

@Component({templateUrl: './create-item.component.html'})
export class CreateItemComponent {

	item = {
		title: '',
		description: '',
		images: null
	};

	titleError = '';
	descriptionError = '';
	uploadError = '';

	creating = false;
	imageUploadIds = [];

	constructor(
		@Inject(NgZone)private zone: NgZone,
		private itemService: ItemService,
		private notificationService: NotificationService,
		private dialogRef: MatDialogRef < CreateItemComponent >
	) {}

	createItem() {
		this.titleError = this.descriptionError = '';

		if (!this.item.title) {
			this.titleError = 'Title can`t be empty';
		}
		if (!this.item.description) {
			this.descriptionError = 'Description can`t be empty';
		}

		if (this.titleError || this.descriptionError) {
			return;
		}

		this.creating = true;
	}

	cancel() {
		this.dialogRef.close();
	}

	onUploadComplete(uploadResponses) {
		this.item.images = uploadResponses
			.filter(({status}) => status)
			.map(({data}) => data);

		if (!this.item.images || !this.item.images.length) {
			this.notificationService.createSimpleNotification('Item should have at least one image');
			return;
		}

		this.itemService.createItem(this.item.title, this.item.description, this.item.images)
			.subscribe((data) => {
				this.notificationService.createSimpleNotification('Item created successfully');

				this.dialogRef.close(true);
			});
	}
}
