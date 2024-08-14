import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialService } from '../services/material.service';
import { ProdutoService } from '../services/produto.service';
import { CadastroService } from '../services/cadastro.service';
import { ColheitaService } from '../services/colheita.service';
import { ArvoreService } from '../services/arvore.service';

@Component({
  selector: 'app-colheita',
  templateUrl: './colheita.component.html',
  styleUrl: './colheita.component.scss',
})
export class ArvoreComponent {
  constructor(private snackbar: MatSnackBar,
    private colheitaService:ColheitaService
  ) {
    this.buscaColheitas()
  }

  //Inicializa o formulário
  colheita: FormGroup = new FormGroup({
    id: new FormControl(null),
    quantidade: new FormControl('', Validators.required),
    dt_colheita: new FormControl('', Validators.required),
    arvore: new FormControl('', Validators.required),
  });

  
  //Métodos dos controles do formulário
  onIncluir(){
    this.colheita.reset();
    this.colheita.enable();
  }
 
  onSalvar(){
    //Guarda as informações em uma variável para melhorar acesso
    let info = this.colheita.value;
    //Verifica se está inserindo ou alterando com base no valor do ID (se for null, está inserido, senão está alterando)
    if(info.id == null){
      //Irá inserir no banco de dados um usuário
      this.colheitaService.addColheita(info).subscribe({
        next: (resposta)=>{
           console.log(resposta);
           this.snackbar.open(
            "Colheita adicionada com sucesso!",
            "OK",
            {
              verticalPosition:'top',
              horizontalPosition:'end',
              duration: 3000
            }
           )
           this.onCancelar()
        },
        error:(erro)=>{
           console.log(erro);
           this.snackbar.open(
            "Oh não! Algo aconteceu de errado",
            "OK",
            {
              verticalPosition:'top',
              horizontalPosition:'end',
              duration: 3000
            }
           )
        }
      }) 
    }else{
      //Irá alterar o usuário no banco de dados
    
    }

  }

  onCancelar(){
     this.colheita.reset();
     this.colheita.disable();
  }

  // Função para buscar as informações e usuários
 
  relat: any[] = [];

  buscaColheitas(){
    this.colheitaService.getColheitas().subscribe({
      next:(resposta) =>{
        console.log(resposta);
        this.relat = resposta.body;
      },
      error:(erro)=>{
        console.log(erro);
      }
    })
  }



}