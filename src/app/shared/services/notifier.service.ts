import {Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
    providedIn: 'root'
})
export class NotifierService {
    constructor(private readonly snackbar: MatSnackBar) {}

    show(message: string, duration = 3000): void {
        this.snackbar.open(message, 'Close', {duration});
    }
}
