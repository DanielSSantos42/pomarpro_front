import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialService } from '../services/material.service';
import { ProdutoService } from '../services/produto.service';
import { CadastroService } from '../services/cadastro.service';
import { MovimentoService } from '../services/movimento.service';

@Component({
  selector: 'app-movimento',
  templateUrl: './movimento.component.html',
  styleUrl: './movimento.component.scss',
})
export class MovimentoComponent {
  constructor(private snackbar: MatSnackBar,
    private movimentoService:MovimentoService
  ) {
    this.buscaMovimentos()
  }

  //Inicializa o formulário
  movimento: FormGroup = new FormGroup({
    id: new FormControl(null),
    tipo: new FormControl('', Validators.required),
    produto: new FormControl('', Validators.required),
    quantidade: new FormControl('', Validators.required),
  });

  
  //Métodos dos controles do formulário
  onIncluir(){
    this.movimento.reset();
    this.movimento.enable();
  }
 
  onSalvar(){
    //Guarda as informações em uma variável para melhorar acesso
    let info = this.movimento.value;
    //Verifica se está inserindo ou alterando com base no valor do ID (se for null, está inserido, senão está alterando)
    if(info.id == null){
      //Irá inserir no banco de dados um usuário
      this.movimentoService.addMovimento(info).subscribe({
        next: (resposta)=>{
           console.log(resposta);
           this.snackbar.open(
            "Movimento adicionado com sucesso!",
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
     this.movimento.reset();
     this.movimento.disable();
  }

  // Função para buscar as informações e usuários
 
  relat: any[] = [];

  buscaMovimentos(){
    this.movimentoService.getMovimentos().subscribe({
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