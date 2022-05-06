import { Component, OnInit } from '@angular/core';
import { ImagenesService } from '../../services/imagene/imagenes.service';
import { Imagen }  from '../../modelos/imagen'

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  Imagenes:Imagen;
  Albun:any;

  constructor(public ImagenesService: ImagenesService) {
    this.ImagenesService.ListaImagenes("Favoritas").subscribe(imagenes=>{
    this.Imagenes = imagenes;
  })
  }

  ngOnInit(): void {
   
  }
}
