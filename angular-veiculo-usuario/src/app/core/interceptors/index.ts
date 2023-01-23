import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth-interceptor';

export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }// estou falando que o meu interceptor é a class AuthInterceptor,
    //tou provendo o HTTP_INTERCEPTOR, use a classe  AuthInterceptor
    //lembrando que eles são executados de cima pra baixo e retornandos de baixo para cima 
];