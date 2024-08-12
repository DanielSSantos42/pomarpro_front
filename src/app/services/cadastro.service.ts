import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  constructor(private http:HttpClient) { }


 public addCadastro(info:any):Observable<any>{
   return this.http.post('http://localhost:3000/cadastro/add', {info}, {observe:'response'})
 }
    
 //Função de busca de usuários
 public getCadastros():Observable<any>{
   return this.http.get('http://localhost:3000/cadastro/buscaTodos',
    {observe:'response'}
   )
 }

}