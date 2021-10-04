import { Component, OnInit } from '@angular/core';
import { FileArchivo } from '../../modelos/archivoimagen';
import { ImagenesService } from '../../services/imagene/imagenes.service';

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styleUrls: ['./carga.component.css']
})
export class CargaComponent implements OnInit {

  estaSobreElemento = false;
  archivos: FileArchivo[] = [];

  constructor( public _cargaImagenes: ImagenesService ) { }

  ngOnInit() {
  }

  cargarImagenes() {
    this._cargaImagenes.CargarImagenesFirebase( this.archivos );
  }

  limpiarArchivos() {
    this.archivos = [];
  }

}
