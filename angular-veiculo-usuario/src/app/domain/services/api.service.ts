import { Injectable } from '@angular/core';
import { ApiRepositoryService } from "../../data/repositories/api-repository.service";
import { VeiculoDTO } from '../models/veiculo.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private apiRepository: ApiRepositoryService //chama o repository
  ) { }

  
  public listAllVeiculo() {
    return this.apiRepository.listAllVeiculo()
  }

  public listAllVeiculoByCurrentUser() {
    return this.apiRepository.listAllVeiculoByCurrentUser();
  }

  public getVeiculoById(id: number) {
    return this.apiRepository.getVeiculoById(id);
  } 

  public addVeiculoByCurrentUse(request: VeiculoDTO) {
    return this.apiRepository.addVeiculoByCurrentUse(request);
  }

  public deleteVeiculoByCurrentUser(id: number) {
    return this.apiRepository.deleteVeiculoByCurrentUser(id);
  }

  public updateVeiculoByCurrentUser(id: number, request: VeiculoDTO) {
    return this.apiRepository.updateVeiculoByCurrentUser(id, request);
  }
}
