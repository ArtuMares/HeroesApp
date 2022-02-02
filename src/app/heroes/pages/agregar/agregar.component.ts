import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { switchMap } from 'rxjs';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
  img{
    width:100%;
    border-radius: 5px
  }
  `
  ]
})
export class AgregarComponent implements OnInit {

  publishers = [{
    id: "DC Comics",
    desc: "DC - Comics"
  },
  {
    id: "Marvel Comics",
    desc: "Marvel - Comics"
  }
  ];
  heroe: Heroe = {
    superhero: "",
    alter_ego: "",
    characters: "",
    first_appearance: "",
    publisher: Publisher.DCComics,
    alt_img: ""
  }

  constructor(private activatedRoute: ActivatedRoute,
    private HeroesService: HeroesService,
    private router: Router,
    private snackBar: MatSnackBar,
    private matDialog: MatDialog) { }

  ngOnInit(): void {
    if (!this.router.url.includes("editar")) {
      return;
    }
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.HeroesService.getHeroePorId(id)))
      .subscribe(heroe => this.heroe = heroe);

  }

  guardar() {
    if (this.heroe.superhero.trim().length === 0) {
      return
    }
    if (this.heroe.id) {
      //actualizar
      this.HeroesService.acualizarHeroe(this.heroe)
        .subscribe(resp => {
          this.mostrarSnack("Registro Actualizado!");
        });
    } else {
      this.HeroesService.agregarHeroe(this.heroe)
        .subscribe(heroe => {
          this.router.navigate(["/heroes/editar", heroe.id])
          this.mostrarSnack("Registro Creado!");
        });
    }
  }
  borrarHeroe() {
    const dialog = this.matDialog.open(ConfirmarComponent, {
      width: "20%",
      data: this.heroe
    })
    dialog.afterClosed()
    .subscribe(res => {
      if (res) {
        console.log(res)
        this.HeroesService.borrarHeroe(this.heroe.id!).subscribe(
          resp=>{
            this.router.navigate(["/heroes"]);
          }
        )
      }
    })

    // .pipe(switchMap( res => 
    //   this.HeroesService.borrarHeroe(this.heroe.id!)
    //   )).subscribe(resp=> this.router.navigate(["/heroes"]));

  }

  mostrarSnack(mensaje: string) {
    this.snackBar.open(mensaje, "Aceptar", {
      duration: 2500
    });
  }
}
