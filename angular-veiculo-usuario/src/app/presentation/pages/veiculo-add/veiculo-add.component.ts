import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbAlert, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VeiculoDTO } from 'src/app/domain/models/veiculo.model';
import { ApiService } from 'src/app/domain/services/api.service';

@Component({
  selector: 'app-veiculo-add',
  templateUrl: './veiculo-add.component.html',
  styleUrls: ['./veiculo-add.component.scss']
})
export class VeiculoAddComponent implements OnInit {

  veiculoDTO: VeiculoDTO = {
    nome: '',
    tipo: ''
  }

  resposta: VeiculoDTO;
  erro: any;
  successMessage: boolean = false

  constructor(
    private apiService: ApiService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
  }

  criarVeiculo() {
    this.apiService.addVeiculoByCurrentUse(this.veiculoDTO)
      .subscribe((data: VeiculoDTO) => {
        this.resposta = data
        console.log("data retornado do create: ", data);
        this.changeSuccessMessage()
        //window.location.reload();
      }, error => {
        this.erro = error;
        console.log("erro ao criar veiculo: ", this.erro);
      })
      
    this.modalService.dismissAll()
  }

  openModal(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
    document.getElementById('nome').focus();
  }

  openModalAlert(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  public changeSuccessMessage() {
    this.successMessage = !this.successMessage
     setTimeout(() => {
      this.successMessage = !this.successMessage 
      window.location.reload()
    }, 1000)
  }
}
