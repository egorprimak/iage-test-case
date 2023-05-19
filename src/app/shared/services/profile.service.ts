import {inject, Injectable} from '@angular/core';
import {BehaviorSubject, Observable, tap} from "rxjs";
import {User} from "../../core/user/user.model";
import {HttpClient} from "@angular/common/http";
import {ActionResult} from "../../core/actions/action.model";
import {API_USERS, PROFILE_KEY} from "../consts";
import {STORAGE} from "../../app.module";

@Injectable({
    providedIn: 'root'
})
export class ProfileService {
    private readonly storage: Storage = inject(STORAGE);
    readonly data$ = new BehaviorSubject<User | null>(null);

    constructor(private readonly http: HttpClient) {}

    get data(): User | null {
        return this.data$.value;
    }

    set data(u: User | null) {
        this.data$.next(u);
    }

    update(data: User): Observable<ActionResult> {
        const path = `/${API_USERS}/${data.id}`;
        return this.http.put<ActionResult>(path, data).pipe(
            tap(res => {
                if (res.success) {
                    this.storage.setItem(PROFILE_KEY, JSON.stringify(data));
                    this.data = data;
                }
            })
        );
    }
}
