import {Injectable} from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class NavigatorService {
    constructor(private readonly router: Router) {
    }

    toHomePage(): void {
        this.navigate('/');
    }

    toLoginPage(): void {
        this.navigate('/login');
    }

    private navigate(path: string): void {
        this.router.navigate([path]).then();
    }
}
