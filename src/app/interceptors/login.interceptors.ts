import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class LoginInterceptor implements HttpInterceptor{

    constructor(

        private routeur: Router
    ){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const token = sessionStorage.getItem('token');
        
        
        console.log('intercept')
        if(token){
            const cloneRequest = req.clone(
                {
                    setHeaders: {
                        'Authorization': `Bearer ${token}`,
                    }
                //params: new HttpParams().set('access_token', token)

             });

             return next.handle(cloneRequest).pipe(
                 catchError ( (error: HttpErrorResponse) => {// on ne gère que les erreurs
                    if(error.status === 401){
                        this.routeur.navigate([""])
                    }
                    return throwError(error) // et on donne l'erreur à la sortie
                 })
             );
        }
        else{
            return next.handle(req)
        }
    }

}

export const LoginInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: LoginInterceptor,
    multi: true
}