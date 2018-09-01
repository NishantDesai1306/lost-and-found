import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
  MatSnackBarModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { ItemCardComponent } from './dashboard/main/item-card/item-card.component';
import { ViewItemComponent } from './dashboard/main/view-items/view-item.component';
import { CreateItemComponent } from './dashboard/main/create-item/create-item.component';
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
    ViewItemComponent,
  ],
  entryComponents: [
    ViewItemComponent,
    CreateItemComponent,
    EditItemComponent
  ],
  imports: [
    SharedModule,

    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    RouterModule,
    LoginModule,
    FormsModule,

    ProgressbarModule.forRoot(),
    ModalModule.forRoot(),

    FlexLayoutModule,

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
    MatSidenavModule,

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
