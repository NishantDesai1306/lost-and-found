import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {MdIconRegistry, MdDialog, MdDialogRef} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  templateUrl: './confirm.component.html'
})
export class ConfirmComponent {
    title: string;
    description: string;
    confirmButtonText: string;
    cancelButtonText: string;

    constructor(public dialogRef: MdDialogRef<ConfirmComponent>) {}
}
