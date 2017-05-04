import { Injectable } from '@angular/core';
import { MdSnackBar, MdDialogRef, MdDialog } from '@angular/material';
import { Observable } from 'rxjs/Rx';
import { ConfirmComponent } from './confirm/confirm.component';

@Injectable()
export class ConfirmService {
    constructor(private dialog: MdDialog) {}

    confirm(title = 'Confirm', message: string, confirmButtonText = 'Confirm', cancelButtonText = 'Cancel'): Observable<boolean> {

        let dialogRef: MdDialogRef<ConfirmComponent>;

        dialogRef = this.dialog.open(ConfirmComponent);
        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.description = message;
        dialogRef.componentInstance.confirmButtonText = confirmButtonText;
        dialogRef.componentInstance.cancelButtonText = cancelButtonText;

        return dialogRef.afterClosed();
    }
}
