import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProfileService} from "../../../shared/services/profile.service";
import {User} from "../../../core/user/user.model";
import * as _ from "lodash";
import {takeUntil} from "rxjs";
import {DestroyerService} from "../../../shared/services/destroyer.service";
import {NotifierService} from "../../../shared/services/notifier.service";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.less'],
})
export class ProfileComponent {
    protected formGroup: FormGroup;
    protected formCopy: FormGroup | undefined;
    protected canEdit = false;
    protected user: User | null;
    protected saving = false;

    constructor(
        private readonly destroyer: DestroyerService,
        private readonly notifier: NotifierService,
        protected profile: ProfileService,
    ) {
        this.user = this.profile.data;

        this.formGroup = new FormGroup({
            firstName: new FormControl(this.user?.firstName, {
                validators: [Validators.required]
            }),
            lastName: new FormControl(this.user?.lastName, {
                validators: [Validators.required]
            }),
            phone: new FormControl(this.user?.phone),
            websiteURL: new FormControl(this.user?.websiteURL),
            email: new FormControl(this.user?.email),
        });
    }

    protected update() {
        if (!this.formGroup.valid) {
            return;
        }

        const {firstName, lastName} = this.formGroup.value;
        if (!firstName.trim() || !lastName.trim()) {
            this.notifier.show('Некорректные данные формы');
            return;
        }

        const user = _.assign({}, this.user, this.formGroup.value);
        console.log('user', user);

        this.saving = true;
        this.profile.update(user)
            .pipe(takeUntil(this.destroyer))
            .subscribe(res => {
                if (res.success) {
                    this.canEdit = false;
                }
                this.notifier.show(res.detail || 'Unknown message');
                this.saving = false;
            });
    }

    protected startEditMode(): void {
        this.canEdit = true;
        this.formCopy = _.cloneDeep(this.formGroup);
    }

    protected cancelEdit(): void {
        this.canEdit = false;
        this.formGroup = this.formCopy!;
        this.formCopy = undefined;
    }
}
