import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {API_USERS} from "../../../shared/consts";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.less']
})
export class ProfileComponent {

    constructor(private readonly http: HttpClient) {
    }

    update() {
        const user = {
            id: '932323383688923',
            firstName: 'Gena'
        };
        this.http.put(`/${API_USERS}/932323383688923`, user)
            .subscribe(r => console.log('res', r));
    }
}
