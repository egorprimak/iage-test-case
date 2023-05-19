import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
    selector: 'app-error-page',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './error-page.component.html',
    styleUrls: ['./error-page.component.less']
})
export class ErrorPageComponent {
    @Input() code: string | number = '404';
    @Input() message = 'Not found';
}
