import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../core/user/user.model";
import {AuthService} from "../../../shared/services/auth.service";
import {DestroyerService} from "../../../shared/services/destroyer.service";
import {takeUntil} from "rxjs";
import {NavigatorService} from "../../../shared/services/navigator.service";

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.less']
})
export class RegistrationComponent {
    protected formGroup: FormGroup;
    protected detail = '';

    constructor(
        private readonly auth: AuthService,
        private readonly navigatorService: NavigatorService,
        private readonly destroyer: DestroyerService,
    ) {
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

    reg(e: Event): void {
        e.preventDefault();

        this.detail = '';
        const data: User = this.formGroup.value;

        this.auth.register(data)
            .pipe(takeUntil(this.destroyer))
            .subscribe(res => {
                this.detail = res.detail;
                if (res.success) {
                    setTimeout(() => this.navigatorService.toLoginPage(), 500);
                }
            });
    }

}
