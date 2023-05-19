import {Injectable} from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class NavigatorService {
    constructor(private readonly router: Router) {
    }

    toHomePage(): void {
        this.navigate('/home');
    }

    toLoginPage(): void {
        this.navigate('/login');
    }

    toRegisterPage(): void {
        this.navigate('/register');
    }

    private navigate(path: string): void {
        this.router.navigate([path]).then();
    }
}
