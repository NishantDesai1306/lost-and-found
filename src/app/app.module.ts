import { ItemCardComponent } from './dashboard/main/item-card/item-card.component';
import { ViewItemComponent } from './dashboard/main/view-items/view-item.component';
import { CreateItemComponent } from './dashboard/main/create-item/create-item.component';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule, OpaqueToken} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule, MdSidenavModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {AppComponent} from './app.component';

import { ChangePasswordComponent } from './dashboard/change-password/change-password.component';
import { UserComponent } from './dashboard/user/user.component';
import { MainComponent } from './dashboard/main/main.component';
import { DashboardCanActivateGuard } from './app.guards';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from './shared/shared.module';
import { RouterModule } from '@angular/router';
import { ProgressbarModule, ModalModule } from 'ng2-bootstrap';
import { CarouselModule } from 'ng2-bootstrap/carousel';

import { LoginModule } from './login/login.module';

import { AppRoutingModule } from './app.routing';
import { HomeComponent } from './home/home.component';
import { NgUploaderModule } from 'ngx-uploader';

import 'hammerjs';
import { EditItemComponent } from './dashboard/main/edit-item/edit-item.component';
import { ChatComponent } from './dashboard/chat/chat.component';
import { NotificationCountService } from './dashboard/services/notification-count.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    MainComponent,
    UserComponent,
    ChangePasswordComponent,
    ItemCardComponent,

    ChatComponent,

    CreateItemComponent,
    EditItemComponent,
    ViewItemComponent
  ],
  entryComponents: [ViewItemComponent, CreateItemComponent, EditItemComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    RouterModule,
    LoginModule,
    SharedModule,
    FormsModule,
    NgUploaderModule,

    ProgressbarModule.forRoot(),
    ModalModule.forRoot(),

    MaterialModule,
    MdSidenavModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    CarouselModule.forRoot()
  ],
  providers: [
    DashboardCanActivateGuard,
    NotificationCountService
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule {}
