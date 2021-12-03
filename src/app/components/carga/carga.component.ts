import { Component, OnInit } from '@angular/core';
import { FileArchivo } from '../../modelos/archivoimagen';
import { ImagenesService } from '../../services/imagene/imagenes.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styleUrls: ['./carga.component.css']
})
export class CargaComponent implements OnInit {
  constructor( public ImagenesService: ImagenesService ) { }

  ImagenElemento = false;
  fileArchivo: FileArchivo[] = [];


  ngOnInit() {

  }
 
  CargarGuardadoImagenes() {
   this.ImagenesService.CargarGuardadoImagenesFirebase( this.fileArchivo );
  }

  LimpiarImagenes() {
    this.fileArchivo = [];
  }


  
}
  


const ELEMENT_DATA: any[] = [];

