import {Injectable} from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanLoad,
    Route,
    RouterStateSnapshot,
    UrlSegment,
    UrlTree
} from '@angular/router';
import {Observable, tap} from 'rxjs';
import {AuthService} from "./shared/services/auth.service";
import {NavigatorService} from "./shared/services/navigator.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
    constructor(
        private readonly auth: AuthService,
        private readonly navigatorService: NavigatorService
    ) {
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.verify();
    }

    canLoad(
        route: Route,
        segments: UrlSegment[]
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.verify();
    }

    private verify(): Observable<boolean> {
        return this.auth.isLogin$.pipe(
            tap(v => !v && this.navigatorService.toLoginPage())
        );
    }
}
