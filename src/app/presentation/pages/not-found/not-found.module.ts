import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NotFoundRoutingModule} from './not-found-routing.module';
import {NotFoundComponent} from './not-found.component';
import {ErrorPageComponent} from "../../components/error-page/error-page.component";


@NgModule({
    declarations: [
        NotFoundComponent
    ],
    imports: [
        CommonModule,
        NotFoundRoutingModule,
        ErrorPageComponent
    ]
})
export class NotFoundModule {
}
