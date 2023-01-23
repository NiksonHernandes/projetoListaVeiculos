import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VeiculoModel } from 'src/app/domain/models/veiculo.model';
import { ApiService } from 'src/app/domain/services/api.service';

@Component({
  selector: 'app-veiculo-delete',
  templateUrl: './veiculo-delete.component.html',
  styleUrls: ['./veiculo-delete.component.scss']
})

export class VeiculoDeleteComponent implements OnInit {

  id: number
  veiculo: VeiculoModel
  successMessage: boolean = false

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute, //para pegar o ID que foi passado na URL
    private appRouting: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id')); //config para pegar o ID da URL e atribuir na variável ID
    this.getVeiculoById()
  }

  public getVeiculoById() {
    this.apiService.getVeiculoById(this.id).subscribe((data: VeiculoModel) => {
      this.veiculo = data;
    })
  }

  public deletar() {
    this.apiService.deleteVeiculoByCurrentUser(this.id).subscribe((data: VeiculoModel) => {
      this.modalService.dismissAll()
      this.changeSuccessMessage()
    })
  }

  cancelar() {
    this.appRouting.navigate(['list-veiculo']);
  }

  openModal(content) {    
		this.modalService.open(content, { size: 'sm' });
	}

  public changeSuccessMessage() {
    this.successMessage = !this.successMessage
     setTimeout(() => {
      this.successMessage = !this.successMessage 
      this.appRouting.navigate(['list-veiculo'])
    }, 1000)
  }

}
