import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import jwt_decode from 'jwt-decode'; 

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  nomeCurrentUserV: string

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }  

  async login(user: any) {
    const result = await this.http.post<any>(`${environment.urlApi}/login`, user).toPromise();
    if (result && result.access_token) {
      //Verifica se tem resultado e se no resultado tem o access_token, se tiver ele salva no localstorage do navegador
      window.localStorage.setItem('token', result.access_token)
      
      window.localStorage.setItem('userCurrent', result.current_user.nome)
      console.log(result.current_user) //posso retornar os dados do current User se eu quiser

      return true;
    }
    return false;
  }

  nomeCurrentUser() {
    
    return window.localStorage.getItem('userCurrent')
  }
  
  async createAccount(account: any) {
    const result = await this.http.post<any>(`${environment.urlApi}/usuario/sign-up`, account).toPromise();
    return result;
  }

  getAuthorizationToken() { //recupera o token do LocalStorage para usar quando quando puder
    const token = window.localStorage.getItem('token');
    return token;
  }

  //pegar a data de expiração do token
  getTokenExpirationDate(token: string): Date {
    const decoded: any = jwt_decode(token); //o JWT_DECODE devolve somente o PAYLOAD do meu token

    if(decoded.exp === undefined) { //esse exp é a data de expiração do meu token dentro do PAYLOAD, baseada no fuso UTC
      return null;
    }
    // a data do PAYLOAD vem em secundos de UTC

    const date = new Date(0); 
    date.setUTCSeconds(decoded.exp)//jogando a data do PAYLOAD na minha variável date
    return date;
  }

  //ver se o token ta expirado
  isTokenExpired(token?: string): boolean {
    if(!token) { //expirado
      return true;
    }

    const date = this.getTokenExpirationDate(token); //recupera a data do token
    if(date === undefined) { //se n tem data retorna false
      return false;
    }

    return !(date.valueOf() > new Date().valueOf()); //analisa se a data do token é maior que a data atual, se n for retorna false
    //valueOf() devolve os TICS data
  }

  //olha se o usuário ta logado
  isUserLoggedIn() {
    const token = this.getAuthorizationToken();

    if(!token) { //se n tem token ele n ta logado 
      return false 
    } else if (this.isTokenExpired(token)) { //verifico se n ta expirado
      return false
    }

    return true;
  }

  //logoff
  public logoff() {
    window.localStorage.removeItem("token");
    alert("logoff efetuado!")
    
    return this.router.navigate(['login']);
  }

}


//COMENTÁRIOS//

// //login fake
  // login(user: any) {
  //   return new Promise((resolve) => { //simulando a API, um promise de resposta, simulando  o método HTTP
  //     window.localStorage.setItem('token', 'meu-token'); //salva  o token no localStorage
  //     resolve(true);
  //   })
  // }

  // //criar conta fake
  // createAccount(account: any) {
  //   return new Promise((resolve) => {
  //     resolve(true);
  //   }) }

  
//chamada com Subscribe
// loginTeste(user: any): Observable<any> {
//   return this.http.post<any>(`${environment.urlApi}/login`, user);
// }