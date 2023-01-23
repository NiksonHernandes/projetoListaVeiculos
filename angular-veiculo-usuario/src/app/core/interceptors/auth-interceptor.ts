import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AccountService } from "../../domain/services/account.service";



@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private accountService: AccountService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) { //req é o request inicial, do login ou create account, qq request ele vai interceptar
        
        const token = this.accountService.getAuthorizationToken(); //recupera o token
        let request: HttpRequest<any> = req; //joga em uma variável, pq eu posso ter e posso não ter o token

        if(token) {
            //o request é imutavel, ou seja, não é possível mudar nada
            //faço o clone para conseguir mudar as propriedades
            //passo o token de authenticação no header
            request = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${token}`)
            });       
        }

        return next.handle(request).pipe(catchError(this.handleError)); //pipe é meio que o stream do Java, ele substitui o Subscribe, ou seja, eu posso criar um pipeline de execução de várias coisas 
    }
    
    private handleError(error: HttpErrorResponse) { //copiado da documentação
        if(error.error instanceof ErrorEvent) {
            //erro de client-side ou de rede
            console.error("Ocorreu um erro: ", error.error.message);
        } else {
            //Erro retornando pelo backend
            console.error(`Código do erro ${error.status}, ` + 
            `Erro: ${JSON.stringify(error.error)}`);   //é aqui que vem a mensagem de erro gerada no meu backend
        }

        //retorna um observable com uma mensagem amigavel
        return throwError("Ocorreu um erro, tente novamente!");  
    }
}