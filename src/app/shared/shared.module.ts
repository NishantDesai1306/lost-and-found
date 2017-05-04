import { ConfirmComponent } from './confirm/confirm.component';
import { ConfirmService } from './confirm.service';
import { ItemService } from './item.service';
import { UserService } from './user.service';
import { AuthSerivce } from './auth.service';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, FactoryProvider, OpaqueToken } from '@angular/core';
import { NotificationService } from './notification.service';
import { MaterialModule } from '@angular/material';
import {ChatzzServiceProvider} from './chatzz.service.provider';

@NgModule({
    imports: [MaterialModule],
    exports: [ConfirmComponent],
    declarations: [ConfirmComponent],
    providers: [
        UserService,
        AuthSerivce,
        NotificationService,
        ItemService,
        ConfirmService,
        ChatzzServiceProvider
    ],
    entryComponents: [ConfirmComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
