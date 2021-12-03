import { Component, OnInit } from '@angular/core';
import { ImagenesService } from '../../services/imagene/imagenes.service';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import { Imagen}  from '../../modelos/imagen'

@Component({
  selector: 'app-imagenes',
  templateUrl: './imagenes.component.html',
  styleUrls: ['./imagenes.component.css']
})
export class ImagenesComponent implements OnInit {

  Nombre:string
  Id:number
  items:Imagen;
  constructor(public ImagenesService: ImagenesService,
              public afs: AngularFirestore
    ) {
    this.ImagenesService.listaImagenes().subscribe(item=>{
      console.log(item);
        this.items = item;
      })
    
  }

  Modaldato(nombre:string, id:number){
    this.Nombre = nombre,
    this.Id = id
  }

  Eliminar(nombre:string, id:number){
    this.ImagenesService.Eliminar(nombre,id);
  }
  elemento: any;
  ngOnInit() {
  }

}
