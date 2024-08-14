import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArvoreService {

  constructor(private http:HttpClient) { }


 public addArvore(info:any):Observable<any>{
   return this.http.post('http://localhost:3000/arvore/add', {info}, {observe:'response'})
 }
    
 //Função de busca de usuários
 public getArvores():Observable<any>{
   return this.http.get('http://localhost:3000/arvore/buscaTodos',
    {observe:'response'}
   )
 }

}