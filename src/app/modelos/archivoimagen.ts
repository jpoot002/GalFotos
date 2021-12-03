export class FileArchivo {

    public idarchivo: number;
    public archivo: File;
    public fecha : Date;
    public nombreArchivo: string;
    public url: string;
    public estaSubiendo: boolean;
    public progreso: number;

    constructor( archivo: File ) {
        this.idarchivo =  (  ((Number(new Date())) + (Number(new Date().getHours()))+ (Number(new Date().getMinutes())) + (Number(new Date().getSeconds())) + (Number(new Date().getMilliseconds())))*  (Math.ceil(Math.random()*31))); 
        this.archivo = archivo;
        this.nombreArchivo = archivo.name;
        this.estaSubiendo = false;
        this.progreso = 0;
        this.fecha  = new Date();

    }

   



    
}
