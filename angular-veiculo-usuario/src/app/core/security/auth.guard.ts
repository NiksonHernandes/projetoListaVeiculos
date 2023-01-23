import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AccountService } from 'src/app/domain/services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private accountService: AccountService
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    //se o usuário ta logado entra na rota, caso contrário n
    if(this.accountService.isUserLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false
    }
  }

}




  
//CAN ACTIVATE PARA A API FAKE
  // canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
  //   //pega o token do localStorage do navegador, se tiver ele diz que esta authenticado, caso contrário redireciona para a tela de login
  //   const token = window.localStorage.getItem('token');
  //   if (token) {
  //     return true;
  //   } else {
  //     this.router.navigate(['login']);
  //     return false
  //   }
  // }
