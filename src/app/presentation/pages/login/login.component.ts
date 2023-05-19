import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserLogin} from "../../../core/user/user.model";
import {AuthService} from "../../../shared/services/auth.service";
import {NavigatorService} from "../../../shared/services/navigator.service";
import {takeUntil} from "rxjs";
import {DestroyerService} from "../../../shared/services/destroyer.service";
import {NotifierService} from "../../../shared/services/notifier.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.less']
})
export class LoginComponent {
    protected loginFormGroup: FormGroup;
    protected passwordHidden = true;
    protected loginInProcess = false;

    constructor(
        private readonly authService: AuthService,
        private readonly navigatorService: NavigatorService,
        private readonly destroyer: DestroyerService,
        private readonly notifier: NotifierService
    ) {
        this.authService.isLogin$
            .pipe(takeUntil(this.destroyer))
            .subscribe(isLogin => {
                if (isLogin) {
                    this.navigatorService.toHomePage();
                }
            });

        this.loginFormGroup = new FormGroup({
            email: new FormControl('', {
                validators: [Validators.email, Validators.required]
            }),
            password: new FormControl('', {
                validators: [Validators.required]
            })
        });
    }

    protected login(e: Event): void {
        e.preventDefault();

        const data: UserLogin = this.loginFormGroup.value;
        if (!data.email.trim() || !data.password.trim()) {
            this.notifier.show('Некорректные данные формы');
            return;
        }

        this.loginInProcess = true;
        this.authService.login(data)
            .pipe(takeUntil(this.destroyer))
            .subscribe(res => {
                this.loginInProcess = false;
                if (res.success) {
                    this.navigatorService.toHomePage();
                }
                this.notifier.show(res.detail);
            });
    }
}
