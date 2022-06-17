import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Albun }  from '../../src/app/modelos/albun';
import { ImagenesService } from '../../src/app/services/imagene/imagenes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public title = 'GalFotos';
  public NombreAlbun:string 
  public Albunes:Albun;

  constructor (private router: Router,
              public ImagenesService: ImagenesService){
                this.ImagenesService.ListaAlbunes().subscribe(albunes=>{
                  this.Albunes = albunes;
                })
              }

  ngOnInit() {
  }

  public Carga() {
    this.router.navigate(['Carga']);
  }

  public Inicio() {
    this.router.navigate(['Inicio']);
  }
  
}





