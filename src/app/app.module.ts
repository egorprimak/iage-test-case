import {InjectionToken, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavbarComponent} from "./presentation/components/navbar/navbar.component";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FakeBackendService} from "./db/fake-backend.service";

export const STORAGE = new InjectionToken<Storage>('Local storage token');

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NavbarComponent,
        HttpClientModule,
        BrowserAnimationsModule,
    ],
    providers: [
        {provide: STORAGE, useValue: localStorage},
        {provide: HTTP_INTERCEPTORS, useClass: FakeBackendService, multi: true},
        MatSnackBar,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
