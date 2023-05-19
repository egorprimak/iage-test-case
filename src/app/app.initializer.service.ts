import {inject, Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {ProfileService} from "./shared/services/profile.service";
import {PROFILE} from "./shared/consts";
import {STORAGE} from "./app.module";
import {AuthService} from "./shared/services/auth.service";

@Injectable({
    providedIn: 'root'
})
export class AppInitializerService {
    private readonly storage: Storage = inject(STORAGE);

    ready = false;

    constructor(
        private readonly profile: ProfileService,
        private readonly auth: AuthService
    ) {}

    init(): Observable<boolean> {
        const storageUser = this.storage.getItem(PROFILE);
        if (storageUser) {
            this.profile.data = JSON.parse(storageUser);
            this.auth.isLogin = true;
        } else {
            this.profile.data = null;
        }

        this.ready = true;
        return of(true);
    }
}
