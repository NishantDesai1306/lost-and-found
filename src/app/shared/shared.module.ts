import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, FactoryProvider, ModuleWithProviders, NO_ERRORS_SCHEMA } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatInputModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatDialogModule
  } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';

import { ConfirmComponent } from './confirm/confirm.component';
import { UploadComponent } from './upload/upload.component';
import { NgxUploaderModule } from 'ngx-uploader';
import { BasicUploadComponent } from './upload/upload-ui/basic/basic.component';
import { UploadTrigger } from './upload/upload-trigger.component';
import { ProfilePictureTriggerComponent } from './upload/upload-ui/profile-picture/profile-picture.trigger.component';
import { ImagePreviewComponent } from './image-preview/image-preview.component';

@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,
        FlexLayoutModule,

        MatSidenavModule,
        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatSlideToggleModule,
        MatMenuModule,
        MatToolbarModule,
        MatCardModule,
        MatFormFieldModule,
        MatSnackBarModule,
        MatDialogModule,
        MatProgressBarModule,

        NgxUploaderModule,
    ],
    declarations: [
        ConfirmComponent,
        UploadComponent,
        UploadTrigger,
        BasicUploadComponent,
        ProfilePictureTriggerComponent,
        ImagePreviewComponent
    ],
    entryComponents: [
        ConfirmComponent,
        BasicUploadComponent,
        ProfilePictureTriggerComponent,
        ImagePreviewComponent
    ],
    exports: [
        UploadComponent,
        ImagePreviewComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class SharedModule {}
