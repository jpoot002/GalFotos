export class Albun {
    public Nombre: string;
    public Descripcion: string;
    public fecha : Date;

    constructor( nombre: string, descripcion: string) {
        this.Nombre = nombre;
        this.Descripcion = descripcion
        this.fecha  = new Date();

    }

}

