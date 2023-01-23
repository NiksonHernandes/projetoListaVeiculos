import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VeiculoModel } from 'src/app/domain/models/veiculo.model';
import { ApiService } from 'src/app/domain/services/api.service';

@Component({
  selector: 'app-veiculo-update',
  templateUrl: './veiculo-update.component.html',
  styleUrls: ['./veiculo-update.component.scss']
})
export class VeiculoUpdateComponent implements OnInit {

  @Input() idVeiculoRecebido!: number;

  dataVeiculo: VeiculoModel

  responseVeiculo: VeiculoModel

  constructor(
    private apiService: ApiService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
  }

  public atualizar() {
    this.apiService.updateVeiculoByCurrentUser(this.idVeiculoRecebido, this.dataVeiculo)
      .subscribe((data: VeiculoModel) => {
        this.responseVeiculo = data;
        console.log("dados Atualizados", data)
        window.location.reload();
      })

      this.modalService.dismissAll()
  }

  open(content) {
    this.apiService.getVeiculoById(this.idVeiculoRecebido)
      .subscribe((data: VeiculoModel) => {
        this.dataVeiculo = {
          id: data.id,
          nome: data.nome,
          tipo: data.tipo
        }

      })

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

}
