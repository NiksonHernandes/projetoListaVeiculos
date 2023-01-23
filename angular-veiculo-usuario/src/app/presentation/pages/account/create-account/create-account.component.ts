import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/domain/services/account.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

  createAccount = {
    nome: '',
    email: '',
    login: '',
    senha: '',
    senhaConfirmacao: ''
  }

  alertErro: boolean = false
  messagem: string

  constructor(
    private accountService: AccountService,
    private route: Router
  ) { }

  ngOnInit(): void {
  }

  async onSubmit() {
    try {
      const senha = (<HTMLInputElement>document.getElementById("password")).value
      const senhaConfirm = (<HTMLInputElement>document.getElementById("passwordConfirm")).value

      if (senha == senhaConfirm) {
        const result = await this.accountService.createAccount(this.createAccount)

        //exibe uma mensagem amigavel
        console.log("conta criada", result);
        alert("Logado com sucesso!");

        this.route.navigate(['']);

      } else {
        this.alertTratamento("Senhas Diferentes!")      
      }

    } catch (error) {
      console.error(error);
      this.alertTratamento("Login já existente. Tente novamente!")
    }
  };

  alertTratamento(message: string) {
    this.messagem = message
    this.alertErro = true;

    setTimeout(() => {
      this.alertErro = false;
    }, 3000);
  }

}
