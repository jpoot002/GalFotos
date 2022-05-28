import { Component, OnInit } from '@angular/core';
import { ImagenesService } from '../../services/imagene/imagenes.service';
import { Imagen }  from '../../modelos/imagen'
import { Albun }  from '../../modelos/albun';
import { AlbunImagen } from  '../../modelos/AlbunImagen'

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  public Imagenes:Imagen;
  public NombreAlbun:string 
  public Albunes:Albun;
  public fileArchivoInput:any[] =[];


  constructor(public ImagenesService: ImagenesService) {
  this.ListaImagenesFavoritas();
  this.ListaCuantroImagenes();
  }

  ngOnInit(): void {
  }

  private ListaImagenesFavoritas(){
    
    this.ImagenesService.ListaImagenes("Albun").subscribe(imagenes=>{
      this.Imagenes = imagenes;
      console.log(this.Imagenes);
      })
  
  }
  
  private ListaCuantroImagenes(){
    this.ImagenesService.ListaAlbunes().subscribe(albunes=>{
      this.Albunes = albunes;
      for (let variable in albunes) {
          this.ImagenesService.ListaCuantroImagenes(this.Albunes[variable].Nombre).subscribe(imagenes=>{
          this.Imagenes = imagenes;
          this.fileArchivoInput.push ([this.Albunes[variable],this.Imagenes]);
          this.fileArchivoInput[variable][1].forEach(element => {
            console.log(this.fileArchivoInput[variable][0].Nombre + ' '+element.url);
          });
          console.log(this.fileArchivoInput);
        });

      }


    })

   

  }

 
}


