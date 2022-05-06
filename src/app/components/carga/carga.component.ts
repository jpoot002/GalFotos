import { Component, OnInit, } from '@angular/core';
import { FileArchivo } from '../../modelos/archivoimagen';
import { Albun }  from '../../modelos/albun'
import { ImagenesService } from '../../services/imagene/imagenes.service';

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styleUrls: ['./carga.component.css']
})
export class CargaComponent implements OnInit {
  constructor( public ImagenesService: ImagenesService) { }

  public ImagenElemento:boolean = false;
  public FileArchivo: FileArchivo[] = [];
  public Color: string;
  public Mensaje: string;
  public Show:string;
  public Albunes:Albun;
  public NombreAlbun:string 

  ngOnInit() {
    this.ImagenesService.customObservable.subscribe((res) => {
      this.AlertFinalCarga(res);
    });
    this.ImagenesService.ListaAlbunes().subscribe(albunes=>{
      this.Albunes = albunes;
    })
    this.Show = "true";
    this.NombreAlbun = "Seleciona un albun"
  }

  public AlertFinalCarga(res: any) {
    alert(res);
    this.LimpiarImagenes();
  }

  CargarGuardadoImagenes() {
    this.ImagenesService.NombreAlbun(this.NombreAlbun );
    this.ImagenesService.CargarGuardadoImagenesFirebase( this.FileArchivo);
  }

  public LimpiarImagenes() {
    this.FileArchivo = [];
  }

  public EliminarUno(Idimagen:number){
    this.FileArchivo.splice(Idimagen,1);
  }

  public TextoAlbun(Texto:string){
    this.NombreAlbun = Texto;
  }

  
}
  



