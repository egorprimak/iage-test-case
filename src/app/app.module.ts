import {InjectionToken, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavbarComponent} from "./presentation/components/navbar/navbar.component";
import {HttpClientModule} from "@angular/common/http";
import {fakeBackend} from "./shared/providers/fake-backend";

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
        // HttpClientInMemoryWebApiModule.forRoot(DbService)
    ],
    providers: [
        {provide: STORAGE, useValue: localStorage},
        fakeBackend,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
