import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../core/user/user.model";
import {AuthService} from "../../../shared/services/auth.service";
import {DestroyerService} from "../../../shared/services/destroyer.service";
import {takeUntil} from "rxjs";
import {NavigatorService} from "../../../shared/services/navigator.service";
import {NotifierService} from "../../../shared/services/notifier.service";

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.less']
})
export class RegistrationComponent {
    protected formGroup: FormGroup;
    protected passwordHidden = true;
    protected regInProcess = false;

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

        this.formGroup = new FormGroup({
            firstName: new FormControl('', {
                validators: [Validators.required]
            }),
            lastName: new FormControl('', {
                validators: [Validators.required]
            }),
            phone: new FormControl(''),
            websiteURL: new FormControl(''),
            email: new FormControl('', {
                validators: [Validators.email, Validators.required]
            }),
            password: new FormControl('', {
                validators: [Validators.required]
            })
        });
    }

    protected reg(e: Event): void {
        e.preventDefault();

        const data: User = this.formGroup.value;
        if (!this.isValidTrim(data)) {
            this.notifier.show('Некорректные данные формы');
            return;
        }

        this.regInProcess = true;
        this.authService.register(data)
            .pipe(takeUntil(this.destroyer))
            .subscribe(res => {
                this.regInProcess = false;
                if (res.success) {
                    this.navigatorService.toLoginPage();
                }
                this.notifier.show(res.detail);
            });
    }

    private isValidTrim(data: User): boolean {
        const {firstName, lastName, email, password} = data;
        return [firstName, lastName, email, password].every(i => !!i.trim());
    }
}
