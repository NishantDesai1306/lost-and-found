import { Injectable } from '@angular/core';
import { MatSnackBar, MatDialogRef, MatDialog } from '@angular/material';
import { Observable } from 'rxjs/Rx';
import { ConfirmComponent } from './confirm/confirm.component';

@Injectable({
    providedIn: 'root'
})
export class ConfirmService {
    constructor(private dialog: MatDialog) {}

    confirm(title = 'Confirm', description: string, confirmButtonText = 'Confirm', cancelButtonText = 'Cancel'): Observable<boolean> {

        let dialogRef: MatDialogRef<ConfirmComponent>;

        dialogRef = this.dialog.open(ConfirmComponent, {
            data: {
                title,
                description,
                confirmButtonText,
                cancelButtonText
            }
        });

        return dialogRef.afterClosed();
    }
}
