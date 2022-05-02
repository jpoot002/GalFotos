import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, } from '@angular/core';
import { FileArchivo } from '../../modelos/archivoimagen';
import { ImagenesService } from '../../services/imagene/imagenes.service';


@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styleUrls: ['./carga.component.css']
})
export class CargaComponent implements OnInit {
  constructor( public ImagenesService: ImagenesService) { }

  ImagenElemento = false;
  fileArchivo: FileArchivo[] = [];
  color: string;
  mensaje: string;
  show:string;

  

  ngOnInit() {
    this.ImagenesService.customObservable.subscribe((res) => {
      this.AlertFinalCarga(res);
    });

    this.show = "true";
  }

  public AlertFinalCarga(res: any) {
    alert(res);
    this.LimpiarImagenes();
  }

  CargarGuardadoImagenes() {
   this.ImagenesService.CargarGuardadoImagenesFirebase( this.fileArchivo );
  }

  public LimpiarImagenes() {
    this.fileArchivo = [];
  }

  public EliminarUno(Idimagen:number){
    this.fileArchivo.splice(Idimagen,1);
  }

}
  



