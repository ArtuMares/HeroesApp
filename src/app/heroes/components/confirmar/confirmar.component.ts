import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-confirmar',
  templateUrl: './confirmar.component.html',
  styles: [
  ]
})
export class ConfirmarComponent implements OnInit {

  constructor(private dialogRef:MatDialogRef<ConfirmarComponent>,
              @Inject(MAT_DIALOG_DATA) public heroe:Heroe) // un dialogref del tipo del componente donde se manda a llamar el Dialog
  { }

  ngOnInit(): void {
    
  }
   borrar(){
    this.dialogRef.close(true);
  }
  cancelar(){
    this.dialogRef.close(false);
  }
}
