import { SharedModule } from './../shared/shared.module';

import {RegisterComponent} from './register/register.component';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';

import {LoginComponent} from './login.component';
import {LoginRoutingModule} from './login.routing';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        LoginRoutingModule,
        SharedModule,

        MaterialModule,
        FlexLayoutModule,
        BrowserAnimationsModule
    ],
    exports: [],
    declarations: [
        LoginComponent, 
        RegisterComponent
    ],
    providers: [],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class LoginModule {}