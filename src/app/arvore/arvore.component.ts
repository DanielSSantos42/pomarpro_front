import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialService } from '../services/material.service';
import { ProdutoService } from '../services/produto.service';
import { CadastroService } from '../services/cadastro.service';
import { ColheitaService } from '../services/colheita.service';
import { ArvoreService } from '../services/arvore.service';

@Component({
  selector: 'app-arvore',
  templateUrl: './arvore.component.html',
  styleUrl: './arvore.component.scss',
})
export class ArvoreComponent {
  constructor(private snackbar: MatSnackBar,
    private arvoreService:ArvoreService
  ) {
    this.buscaArvores()
  }

  //Inicializa o formulário
  arvore: FormGroup = new FormGroup({
    id: new FormControl(null),
    defensivo: new FormControl('', Validators.required),
    fertilizante: new FormControl('', Validators.required),
    ultima_verif: new FormControl('', Validators.required),
    linha: new FormControl('', Validators.required),
    coluna: new FormControl('', Validators.required),
    tipo: new FormControl('', Validators.required),
    situacao: new FormControl('', Validators.required),
    pomar: new FormControl('', Validators.required),
  });

  
  
  onIncluir(){
    this.arvore.reset();
    this.arvore.enable();
  }
 
  onSalvar(){
    let info = this.arvore.value;
    
    if(info.id == null){
    
      this.arvoreService.addArvore(info).subscribe({
        next: (resposta)=>{
           console.log(resposta);
           this.snackbar.open(
            "Árvore adicionada com sucesso!",
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
      
    
    }

  }

  onCancelar(){
     this.arvore.reset();
     this.arvore.disable();
  }
 
  relat: any[] = [];

  buscaArvores(){
    this.arvoreService.getArvores().subscribe({
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