import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialService } from '../services/material.service';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrl: './material.component.scss',
})
export class MaterialComponent {
  constructor(private snackbar: MatSnackBar,
    private materialService:MaterialService
  ) {
    this.buscaMateriais()
  }

  //Inicializa o formulário
  material: FormGroup = new FormGroup({
    id: new FormControl(null),
    nome: new FormControl('', Validators.required),
    valor: new FormControl('', Validators.required),
    tipo: new FormControl('', Validators.required),
    fornecedor: new FormControl('', Validators.required),
  });

  
  //Métodos dos controles do formulário
  onIncluir(){
    this.material.reset();
    this.material.enable();
  }
 
  onSalvar(){
    //Guarda as informações em uma variável para melhorar acesso
    let info = this.material.value;
    //Verifica se está inserindo ou alterando com base no valor do ID (se for null, está inserido, senão está alterando)
    if(info.id == null){
      //Irá inserir no banco de dados um usuário
      this.materialService.addMaterial(info).subscribe({
        next: (resposta)=>{
           console.log(resposta);
           this.snackbar.open(
            "Material adicionado com sucesso!",
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
     this.material.reset();
     this.material.disable();
  }

  // Função para buscar as informações e usuários
 
  relat: any[] = [];

  buscaMateriais(){
    this.materialService.getMateriais().subscribe({
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


