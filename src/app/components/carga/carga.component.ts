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

  ImagenElemento = false;
  archivos: FileArchivo[] = [];

  constructor( public ImagenesService: ImagenesService ) { }

  /*ngOnInit() {
  }*/

  CargarImagenes() {
    //this.ImagenesService.CargarImagenesFirebase( this.archivos );
    console.log( this.archivos );
  }

  LimpiarArchivos() {
    this.archivos = [];
  }


  columnas: string[] = ['codigo', 'descripcion', 'precio'];

  datos: Articulo[] = [new Articulo(1, 'papas', 55),
  new Articulo(2, 'manzanas', 53),
  new Articulo(3, 'naranjas', 25),
  ];
  dataSource = null;

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.datos);
  }

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }  
}

export class Articulo {
  constructor(public codigo: number, public descripcion: string, public precio: number) {
  }
}