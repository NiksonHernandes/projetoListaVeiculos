import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { VeiculoModel } from 'src/app/domain/models/veiculo.model';
import { ApiService } from 'src/app/domain/services/api.service';

@Component({
  selector: 'app-veiculo-list',
  templateUrl: './veiculo-list.component.html',
  styleUrls: ['./veiculo-list.component.scss']
})
export class VeiculoListComponent implements OnInit {

  veiculosCurrentUser: VeiculoModel[];
  erro: any;
  dtoptions: DataTables.Settings = {};

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.dtoptions = {
      pagingType: 'full_numbers',
      searching: true,
      //paging: true,

      language: {
        paginate: {
          first: 'primeiro',
          last: 'último',
          next: 'próximo',
          previous: 'anterior',

        },
        // lengthMenu: 'Display <select>' +
        //   '<option value="10">10</option>' +
        //   '<option value="20">20</option>' +
        //   '<option value="30">30</option>' +
        //   '<option value="40">40</option>' +
        //   '<option value="50">50</option>' +
        //   '<option value="-1">All</option>' +
        //   '</select> records',

        // paging: 'ok',
        search: 'Pesquisar:',
        searchPlaceholder: 'Digite sua pesquisa aqui'
      }

    };

    this.listAllVeiculoByCurrentUser();
  }

  public listAllVeiculoByCurrentUser() {
    this.apiService.listAllVeiculoByCurrentUser().subscribe((data: VeiculoModel[]) => {
      this.veiculosCurrentUser = data;
      console.log("dados do usuário: ", data);

    }, error => {
      this.erro = error;
      console.log("erro de acesso! by: teste: ", this.erro);
    })
  }


}
