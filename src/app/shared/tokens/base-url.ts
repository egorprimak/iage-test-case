import {InjectionToken} from "@angular/core";

export const BASE_URL_TOKEN = new InjectionToken<string>('Base url', {
    providedIn: 'root',
    factory: () => 'api/'
});
