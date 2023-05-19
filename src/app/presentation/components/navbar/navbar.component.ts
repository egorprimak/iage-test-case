import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthService} from "../../../shared/services/auth.service";
import {RouterLinkActive, RouterLinkWithHref} from "@angular/router";
import {ProfileService} from "../../../shared/services/profile.service";
import {User} from "../../../core/user/user.model";
import {NavigatorService} from "../../../shared/services/navigator.service";
import {takeUntil} from "rxjs";
import {DestroyerService} from "../../../shared/services/destroyer.service";
import {MatButtonModule} from "@angular/material/button";

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [CommonModule, RouterLinkWithHref, RouterLinkActive, MatButtonModule],
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.less'],
    providers: [DestroyerService]
})
export class NavbarComponent {
    protected user!: User | null;

    constructor(
        private readonly auth: AuthService,
        private readonly profile: ProfileService,
        private readonly navigatorService: NavigatorService,
        private readonly destroyer: DestroyerService
    ) {
        this.profile.data$
            .pipe(takeUntil(this.destroyer))
            .subscribe(u => this.user = u);
    }

    logout(): void {
        this.auth.logout();
        this.navigatorService.toLoginPage();
    }
}
