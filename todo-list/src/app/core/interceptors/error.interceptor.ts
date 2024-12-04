import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SNACK_ERROR_MESSAGES } from '../../shared/constants/snack.constant';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private _snackBar: MatSnackBar) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                this.handleError(error);
                return throwError(error);
            })
        );
    }

    private handleError(error: HttpErrorResponse): void {
        let errorMessage = SNACK_ERROR_MESSAGES.unknownError;

        switch (error.status) {
            case 0:
                errorMessage = SNACK_ERROR_MESSAGES.error0;
                break;
            case 400:
                errorMessage = SNACK_ERROR_MESSAGES.error400;
                break;
            case 404:
                errorMessage = SNACK_ERROR_MESSAGES.error404;
                break;
            case 500:
                errorMessage = SNACK_ERROR_MESSAGES.error500;
                break;
            default:
                errorMessage = `Error ${error.status}: ${error.message}`;
        }

        this._snackBar.open(errorMessage, 'Close', {
            duration: 3000,
        });
    }
}
