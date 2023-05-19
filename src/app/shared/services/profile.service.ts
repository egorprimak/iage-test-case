import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {User} from "../../core/user/user.model";

@Injectable({
    providedIn: 'root'
})
export class ProfileService {
    readonly data$ = new BehaviorSubject<User | null>(null);

    get data(): User | null {
        return this.data$.value;
    }

    set data(u: User | null) {
        this.data$.next(u);
    }
}
