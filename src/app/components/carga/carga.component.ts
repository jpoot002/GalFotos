import { Component, OnInit } from '@angular/core';
import { FileArchivo } from '../../modelos/archivoimagen';
import { ImagenesService } from '../../services/imagene/imagenes.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styleUrls: ['./carga.component.css']
})
export class CargaComponent implements OnInit {
  ngOnInit() {
  }
  
  ImagenElemento = true;
  fileArchivo: FileArchivo[] = [];

  constructor( public ImagenesService: ImagenesService ) { }

  CargarImagenes() {
    this.ImagenesService.CargarImagenesFirebase( this.fileArchivo );
    console.log( this.fileArchivo );
  }

  LimpiarImagenes() {
    this.fileArchivo = [];
  }



  
    
}


