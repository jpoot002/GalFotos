import { Component, OnInit } from '@angular/core';
import { ImagenesService } from '../../services/imagene/imagenes.service';
import { Albun } from '../../modelos/albun';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-algun',
  templateUrl: './algun.component.html',
  styleUrls: ['./algun.component.css']
})
export class AlgunComponent implements OnInit {

  constructor( public ImagenesService: ImagenesService) { }

  profileForm = new FormGroup({
    NombreAlbun: new FormControl(''),
    Descripcion: new FormControl(''),
  });

  ngOnInit(): void {
  }

  public Guardar() {
    if (this.profileForm.value.NombreAlbun.length > 0 && this.profileForm.value.Descripcion.length > 0) {
      this.ImagenesService.GuardarAlbun(this.profileForm.value.NombreAlbun,this.profileForm.value.Descripcion);

    }
  }



}



