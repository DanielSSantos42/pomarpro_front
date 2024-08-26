import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

 

  constructor(private http:HttpClient) { }

  public gethome():Observable<any>{
    return this.http.get('http://localhost:3000/home/buscaTodos',
    {observe:'response'})
  }

  public gethomeS():Observable<any>{
    return this.http.get('http://localhost:3000/home/buscaTodosS',
    {observe:'response'})
  }

}