import { Component, OnInit } from '@angular/core';
import { ImagenesService } from '../../services/imagene/imagenes.service';
import { Imagen}  from '../../modelos/imagen'

@Component({
  selector: 'app-imagenes',
  templateUrl: './imagenes.component.html',
  styleUrls: ['./imagenes.component.css']
})
export class ImagenesComponent {

  items:Imagen;
  nombre: string;
  url: string;
  idarchivo: number; 
  fecha : Date;

  constructor(public ImagenesService: ImagenesService
    ) {
      this.ImagenesService.listaImagenes().subscribe(item=>{
        this.items = item;
      })
    
  }

  Modaldato(item:Imagen){
    this.nombre = item.nombre;
    this.url=item.url;
    this.idarchivo= item.idarchivo;
  }

  Eliminar(){
    this.ImagenesService.Eliminar(this.nombre,this.idarchivo);
  }
  elemento: any;

}
