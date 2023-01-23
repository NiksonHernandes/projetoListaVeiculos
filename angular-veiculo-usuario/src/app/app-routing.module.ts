import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateAccountComponent } from './presentation/pages/account/create-account/create-account.component';
import { LoginComponent } from './presentation/pages/account/login/login.component';
import { AuthGuard } from "./core/security/auth.guard";
import { VeiculoListComponent } from './presentation/pages/list/veiculo-list/veiculo-list.component';
import { VeiculoListAllComponent } from './presentation/pages/list/veiculo-list-all/veiculo-list-all.component';
import { VeiculoDeleteComponent } from './presentation/pages/veiculo-delete/veiculo-delete.component';
import { VeiculoPageMainComponent } from './presentation/pages/veiculo-page-main/veiculo-page-main.component';
import { PublicRoutesComponent } from './presentation/routings/public-routes/public-routes.component';
import { AuthenticationRoutesComponent } from './presentation/routings/authentication-routes/authentication-routes.component';

const routes: Routes = [
  {
    path: '', component: AuthenticationRoutesComponent, 
    children: [
      {
        path: '', component: VeiculoPageMainComponent
      },
      {
        path: 'list-all-veiculo', component: VeiculoListAllComponent //metodo list-all-veiculo (somente ADM)
      },
      {
        path: 'list-veiculo', component: VeiculoListComponent //metodo list-all-veiculo do usuario
      },
      {
        path: 'delete-veiculo/:id', component: VeiculoDeleteComponent
      }
    ],
    canActivate: [AuthGuard]
    //entra nessa rota e primeiro ele vem no canActivate e pergunta se pode ativar a rota (só se tiver token)
    //responde false e vai pra tela de login
  },

  {
    path: '', component: PublicRoutesComponent, 
    children: [
      {
        path: '', redirectTo: 'login', pathMatch: 'full' 
        // '/team/11/user' -> Full, considera a rota toda  'team/:id' -> Prefix, considera só o prefixo dela
      },
      {
        path: 'login', component: LoginComponent
      },
      {
        path: 'create-account', component: CreateAccountComponent
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule] //diz para a aplicação quais componentes estão para uso
})
export class AppRoutingModule { }
