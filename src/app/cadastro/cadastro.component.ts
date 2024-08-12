import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialService } from '../services/material.service';
import { ProdutoService } from '../services/produto.service';
import { CadastroService } from '../services/cadastro.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss',
})
export class CadastroComponent {
  constructor(private snackbar: MatSnackBar,
    private cadastroService:CadastroService
  ) {
    this.buscaCadastros()
  }

  //Inicializa o formulário
  cadastro: FormGroup = new FormGroup({
    id: new FormControl(null),
    apelido: new FormControl('', Validators.required),
    num_linha: new FormControl('', Validators.required),
    num_coluna: new FormControl('', Validators.required),
  });

  
  //Métodos dos controles do formulário
  onIncluir(){
    this.cadastro.reset();
    this.cadastro.enable();
  }
 
  onSalvar(){
    //Guarda as informações em uma variável para melhorar acesso
    let info = this.cadastro.value;
    //Verifica se está inserindo ou alterando com base no valor do ID (se for null, está inserido, senão está alterando)
    if(info.id == null){
      //Irá inserir no banco de dados um usuário
      this.cadastroService.addCadastro(info).subscribe({
        next: (resposta)=>{
           console.log(resposta);
           this.snackbar.open(
            "Cadastro adicionado com sucesso!",
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
     this.cadastro.reset();
     this.cadastro.disable();
  }

  // Função para buscar as informações e usuários
 
  relat: any[] = [];

  buscaCadastros(){
    this.cadastroService.getCadastros().subscribe({
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