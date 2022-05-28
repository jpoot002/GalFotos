import { Component, OnInit } from '@angular/core';
import { ImagenesService } from '../../services/imagene/imagenes.service';
import { Imagen}  from '../../modelos/imagen'

@Component({
  selector: 'app-imagenes',
  templateUrl: './imagenes.component.html',
  styleUrls: ['./imagenes.component.css']
})
export class ImagenesComponent  implements OnInit{

  Imagenes:Imagen;
  Nombre: string;
  Url: string;
  Idarchivo: number; 
  public NombreAlbun:string 
  
  constructor(public ImagenesService: ImagenesService
    ) {
      this.ImagenesService.ListaImagenes("img").subscribe(item=>{
      this.Imagenes = item;
    })
  }

  ngOnInit() {
    
  }

  Modaldato(item:Imagen){
    this.Nombre = item.nombre;
    this.Url=item.url;
    this.Idarchivo= item.idarchivo;
  }

  Eliminar(){
    this.ImagenesService.Eliminar(this.Nombre,this.Idarchivo,"img");
  }
 

}
