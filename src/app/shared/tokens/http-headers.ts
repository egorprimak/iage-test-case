import {InjectionToken} from "@angular/core";
import {HttpHeaders} from "@angular/common/http";

export const HTTP_HEADERS = new InjectionToken('HTTP Headers', {
    providedIn: 'root',
    factory: () => ({
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    })
})
