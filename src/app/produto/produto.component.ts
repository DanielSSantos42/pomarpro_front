import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialService } from '../services/material.service';
import { ProdutoService } from '../services/produto.service';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrl: './produto.component.scss',
})
export class ProdutoComponent {
  constructor(private snackbar: MatSnackBar,
    private produtoService:ProdutoService
  ) {
    this.buscaProdutos()
  }

  //Inicializa o formulário
  produto: FormGroup = new FormGroup({
    id: new FormControl(null),
    descricao: new FormControl('', Validators.required),
    unidade_medida: new FormControl('', Validators.required),
    tipo: new FormControl('', Validators.required),
    valor: new FormControl('', Validators.required),
  });

  
  //Métodos dos controles do formulário
  onIncluir(){
    this.produto.reset();
    this.produto.enable();
  }
 
  onSalvar(){
    //Guarda as informações em uma variável para melhorar acesso
    let info = this.produto.value;
    //Verifica se está inserindo ou alterando com base no valor do ID (se for null, está inserido, senão está alterando)
    if(info.id == null){
      //Irá inserir no banco de dados um usuário
      this.produtoService.addProduto(info).subscribe({
        next: (resposta)=>{
           console.log(resposta);
           this.snackbar.open(
            "Produto adicionado com sucesso!",
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
     this.produto.reset();
     this.produto.disable();
  }

  // Função para buscar as informações e usuários
 
  relat: any[] = [];

  buscaProdutos(){
    this.produtoService.getProdutos().subscribe({
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