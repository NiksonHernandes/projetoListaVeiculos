import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { VeiculoDTO, VeiculoModel } from 'src/app/domain/models/veiculo.model';

@Injectable({
  providedIn: 'root'
})
export class ApiRepositoryService {

  // private apiurl = 'https://jsonplaceholder.typicode.com/posts'
  private urlApiVeiculo = 'http://localhost:8080/veiculo'

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private methodsHttp: HttpClient
  ) { }

  public listAllVeiculo(): Observable<VeiculoModel[]> {
    return this.methodsHttp.get<VeiculoModel[]>(this.urlApiVeiculo);
  }

  public listAllVeiculoByCurrentUser(): Observable<VeiculoModel[]> {
    return this.methodsHttp.get<VeiculoModel[]>(`${this.urlApiVeiculo}/list-all-veiculo-by-current-user`);
  }

  public getVeiculoById(id: number): Observable<VeiculoModel> {
    return this.methodsHttp.get<VeiculoModel>(`${this.urlApiVeiculo}/get-veiculo-by-id/${id}`);
  }

  public addVeiculoByCurrentUse(request: VeiculoDTO): Observable<VeiculoDTO> {
    return this.methodsHttp.post<VeiculoDTO>(`${this.urlApiVeiculo}/add-veiculo-by-current-user`, request, this.httpOptions);
  }

  public deleteVeiculoByCurrentUser(id: number): Observable<VeiculoModel> {
    return this.methodsHttp.delete<VeiculoModel>(`${this.urlApiVeiculo}/delete-veiculo-by-current-user/${id}`, this.httpOptions)
  }

  public updateVeiculoByCurrentUser(id: number, request: VeiculoDTO): Observable<VeiculoModel> {
    return this.methodsHttp.put<VeiculoModel>(`${this.urlApiVeiculo}/update-veiculo-by-current-user/${id}`, request, this.httpOptions);
  }


}



//COMENTÁRIOS 

  
//chamada assíncrona
// public getPostagens() { 
//   return this.apiRepository.getPostagens().subscribe((data: Postagens[]) => {
//     console.log("data retornado da API teste: ", data);
//   });
// }

// public getPostagensByPostId(id: number): Observable<Postagens> {
//   return this.methodsHttp.get<Postagens>(`${this.apiurl}/${id}`);
// }

// public createPost(postagem: Postagens): Observable<Postagens> {
//   return this.methodsHttp.post<Postagens>(this.apiurl, postagem)
// }