import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from "../../../../domain/services/account.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login = {
    username: '',
    password: ''
  };

  erro: any;
  alertErro: boolean = false;
  input: any
  img: any

  constructor(
    private accountService: AccountService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  async onSubmit() {
    try {
      const result = await this.accountService.login(this.login);
      console.log(`Login efetuado: ${result}`);

      //navego para a rota vazia novamente
      this.router.navigate(['']); //cai no HomeComponent  
    } catch(err) {
      this.alertErro = true;

      setTimeout(() => {
        this.alertErro = false;
      }, 3000);
      
      console.log('entrou no erro', err);
    }
  }


}



//COMENTÁRIO 
//feito com Observable
    // this.accountService.loginTeste(this.login).subscribe((data => {
    //   const result = data;

    //   if (result && result.access_token) {
    //     //Verifica se tem resultado e se no resutlado tem o access_token, se tiver ele salva no localstorage do navegador
    //     window.localStorage.setItem('token', result.access_token)

    //     console.log(JSON.stringify(result.current_user));
    //     //navego para a rota vazia novamente
    //   this.router.navigate(['']); //cai no HomeComponent
    //   }
    //   return false;
    // }),  error => {
    //   this.erro = error;
    //   console.log("erro: ", this.erro);
    // })