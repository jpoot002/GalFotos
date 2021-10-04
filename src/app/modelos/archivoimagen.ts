export class FileArchivo {

    public idarchivo: number;
    public archivo: File;
    public nombreArchivo: string;
    public url: string;
    public estaSubiendo: boolean;
    public progreso: number;

    constructor( archivo: File ) {
        this.idarchivo = Number.parseFloat((new Date(),'yyyy-MM-dd HH:mm:ss Z')); 
        this.archivo = archivo;
        this.nombreArchivo = archivo.name;
        this.estaSubiendo = false;
        this.progreso = 0;

    }

}
