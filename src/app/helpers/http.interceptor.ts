import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
    constructor(private router: Router) {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let headers;
        if(this.router.url != '/login') {
            const session_id: any = sessionStorage.getItem('session_id');
            console.log(req)
             headers = req.headers
                .set('session_id', session_id);
        } else {
            headers = req.headers
            .set('session_id', '');
        }
      
        const authReq = req.clone({ headers });
        return next.handle(authReq);
    }
}