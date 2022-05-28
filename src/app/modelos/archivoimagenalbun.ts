export class ArchivoImagenAlbun {

    public idarchivo: number;
    public fecha : Date;
    public nombreArchivo: string;
    public url: string;
    public estaSubiendo: boolean;
    public progreso: number;
    public temurl:string;

    constructor( NombreArchivo: string, temurl:string ) {
        this.idarchivo =  (  ((Number(new Date())) + (Number(new Date().getHours()))+ (Number(new Date().getMinutes())) + (Number(new Date().getSeconds())) + (Number(new Date().getMilliseconds())))*  (Math.ceil(Math.random()*31))); 
        this.nombreArchivo = NombreArchivo;
        this.estaSubiendo = false;
        this.progreso = 0;
        this.fecha  = new Date();
        this.temurl= temurl;
    }
    
}
