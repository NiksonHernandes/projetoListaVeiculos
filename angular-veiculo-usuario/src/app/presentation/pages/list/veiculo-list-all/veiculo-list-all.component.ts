import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VeiculoModel } from 'src/app/domain/models/veiculo.model';
import { AccountService } from 'src/app/domain/services/account.service';
import { ApiService } from 'src/app/domain/services/api.service';

@Component({
  selector: 'app-veiculo-list-all',
  templateUrl: './veiculo-list-all.component.html',
  styleUrls: ['./veiculo-list-all.component.scss']
})
export class VeiculoListAllComponent implements OnInit {

  //SOMENTE ROLE DE ADM PODE ACESSAR ESSE COMPONENTE
  veiculos: VeiculoModel[];
  erro: any

  constructor(
    private apiService: ApiService,

  ) { }

  ngOnInit(): void {
    this.listAllVeiculo();
  }

  public listAllVeiculo() {
    this.apiService.listAllVeiculo().subscribe((data: VeiculoModel[]) => {
      this.veiculos = data;

      console.log("data veiculos: ", data);
    }, error => {
      this.erro = error;
      alert("Acesso Negado! Somente administrador!")
      console.log("erro de acesso! by: teste: ", this.erro);

    })
  }

}
