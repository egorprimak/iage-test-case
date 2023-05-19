import {Inject, Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, switchMap, tap} from "rxjs";
import {User, UserLogin} from "../../core/user/user.model";
import {ActionResult} from "../../core/actions/action.model";
import {ProfileService} from "./profile.service";
import {STORAGE} from "../../app.module";
import {API_LOGIN, API_REGISTER, IS_LOGIN, PROFILE} from "../consts";
import {HttpClient} from "@angular/common/http";
import {FakeBackendActionResult} from "../../db/fake-backend.model";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    readonly isLogin$ = new BehaviorSubject<boolean>(false);

    constructor(
        private readonly profile: ProfileService,
        private readonly http: HttpClient,
        @Inject(STORAGE) private readonly storage: Storage
    ) {
    }

    get isLogin(): boolean {
        return this.isLogin$.value;
    }

    set isLogin(v: boolean) {
        this.isLogin$.next(v);
    }

    register(data: User): Observable<ActionResult> {
        const path = '/' + API_REGISTER;
        return this.http.post<ActionResult>(path, data);
    }

    login(data: UserLogin): Observable<ActionResult> {
        const path = '/' + API_LOGIN;
        return this.http.post<FakeBackendActionResult>(path, data)
            .pipe(
                tap(res  => {
                    const user = res?.user || null;
                    this.profile.data = user;
                    this.isLogin = !!user;
                    this.storage.setItem(PROFILE, JSON.stringify(user));
                }),
                switchMap(data => {
                    const actionResult: ActionResult = {
                        success: data?.success || false,
                        error: data?.error || false,
                        detail: data?.detail || ''
                    };
                    return of(actionResult);
                })
            );
    }

    logout(): void {
        this.profile.data = null;
        this.isLogin = false;
        this.storage.removeItem(PROFILE);
        this.storage.removeItem(IS_LOGIN);
    }
}
