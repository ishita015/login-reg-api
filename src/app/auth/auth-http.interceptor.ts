import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
// import { KeyValueStorageService } from './key-value-storage.service';
import { AuthService } from './../auth/auth.services';

@Injectable()

export class AuthHttpInterceptor implements HttpInterceptor {

    constructor(public auth: AuthService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('xxxxxxxxx xxxxxxxx xxxxxxx', this.auth.getToken());
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${this.auth.getToken()}`
            }
        });
        return next.handle(request);
    }
}
