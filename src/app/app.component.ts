import {Component} from '@angular/core';
import {AppInitializerService} from "./app.initializer.service";
import {ProfileService} from "./shared/services/profile.service";
import {DestroyerService} from "./shared/services/destroyer.service";
import {User} from "./core/user/user.model";
import {combineLatest, takeUntil} from "rxjs";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less']
})
export class AppComponent {
    protected user!: User | null;

    constructor(
        private readonly profile: ProfileService,
        private readonly destroyer: DestroyerService,
        protected readonly initializer: AppInitializerService,
    ) {
        const init$ = this.initializer.init();
        const user$ = this.profile.data$;

        combineLatest([user$, init$]).pipe(
            takeUntil(this.destroyer)
        ).subscribe(([user]) => this.user = user);
    }
}
