import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrl: './material.component.scss',
})
export class CadUsuarioComponent {
  constructor(private snackbar: MatSnackBar) {}

  //Inicializa o formulário
  material: FormGroup = new FormGroup({
    id: new FormControl(null),
    nome: new FormControl('', Validators.required),
    valor: new FormControl('', Validators.required),
    tipo: new FormControl('', Validators.required),
    fornecedor: new FormControl('', Validators.required),
  });
}
