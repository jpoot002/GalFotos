import { Albun } from  './albun';
import { Imagen } from  './imagen';

export class AlbunImagen  {
    Albun:Albun
    Imagen:[
        any
    ]

    constructor(  albun:Albun, any:any ) {
        this.Albun = albun;
        this.Imagen = any;
       
    }
}


