import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VeiculoModel } from 'src/app/domain/models/veiculo.model';
import { ApiService } from 'src/app/domain/services/api.service';

@Component({
  selector: 'app-veiculo-visualizar',
  templateUrl: './veiculo-visualizar.component.html',
  styleUrls: ['./veiculo-visualizar.component.scss']
})
export class VeiculoVisualizarComponent implements OnInit {

  @Input() idVeiculoRecebido!: number;
  // id: number;
  erro: any
  dataVeiculo: VeiculoModel;

  constructor(
    private apiService: ApiService,
    private modalService: NgbModal,
    private appRouting: Router
  ) { }

  ngOnInit(): void {
  }

  open(content) {
    this.apiService.getVeiculoById(this.idVeiculoRecebido)
      .subscribe((data: VeiculoModel) => {
        this.dataVeiculo = {
          id: data.id,
          nome: data.nome,
          tipo: data.tipo
        }
        console.log("dados do veiculo-by-current-user:", data);

      }, error => {
        this.erro = error;
        alert("Acesso Negado! \nSem permissão para acessar esse veiculo. ")
        this.appRouting.navigate(['list-veiculo']);
      })

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

}
