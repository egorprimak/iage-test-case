import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserLogin} from "../../../core/user/user.model";
import {AuthService} from "../../../shared/services/auth.service";
import {NavigatorService} from "../../../shared/services/navigator.service";
import {takeUntil} from "rxjs";
import {DestroyerService} from "../../../shared/services/destroyer.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.less']
})
export class LoginComponent {
    protected loginFormGroup: FormGroup;
    protected detail = '';

    constructor(
        private readonly authService: AuthService,
        private readonly navigatorService: NavigatorService,
        private readonly destroyer: DestroyerService
    ) {
        this.loginFormGroup = new FormGroup({
            email: new FormControl('', {
                validators: [Validators.email, Validators.required]
            }),
            password: new FormControl('', {
                validators: [Validators.required]
            })
        });
    }

    login(e: Event): void {
        e.preventDefault();

        this.detail = '';
        const data: UserLogin = this.loginFormGroup.value;

        this.authService.login(data)
            .pipe(takeUntil(this.destroyer))
            .subscribe(res => {
                console.log('res', res);
                this.detail = res.detail;
            });
    }
}
