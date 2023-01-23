import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './presentation/shared/header/header.component';
import { FooterComponent } from './presentation/shared/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './presentation/pages/account/login/login.component';
import { CreateAccountComponent } from './presentation/pages/account/create-account/create-account.component';
import { httpInterceptorProviders } from "./core/interceptors/";
import { VeiculoAddComponent } from './presentation/pages/veiculo-add/veiculo-add.component';
import { VeiculoListComponent } from './presentation/pages/list/veiculo-list/veiculo-list.component';
import { VeiculoListAllComponent } from './presentation/pages/list/veiculo-list-all/veiculo-list-all.component';
import { VeiculoDeleteComponent } from './presentation/pages/veiculo-delete/veiculo-delete.component';
import { VeiculoUpdateComponent } from './presentation/pages/veiculo-update/veiculo-update.component';
import { VeiculoPageMainComponent } from './presentation/pages/veiculo-page-main/veiculo-page-main.component';
import { VeiculoVisualizarComponent } from './presentation/pages/veiculo-visualizar/veiculo-visualizar.component';
import { DataTablesModule } from "angular-datatables";
import { PublicRoutesComponent } from './presentation/routings/public-routes/public-routes.component';
import { AuthenticationRoutesComponent } from './presentation/routings/authentication-routes/authentication-routes.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    CreateAccountComponent,
    VeiculoAddComponent,
    VeiculoListComponent,
    VeiculoListAllComponent,
    VeiculoDeleteComponent,
    VeiculoUpdateComponent,
    VeiculoPageMainComponent,
    VeiculoVisualizarComponent,
    PublicRoutesComponent,
    AuthenticationRoutesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    DataTablesModule,
    HttpClientModule,
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
