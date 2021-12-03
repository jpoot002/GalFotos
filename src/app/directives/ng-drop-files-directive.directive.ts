import { Directive, EventEmitter, ElementRef, HostListener, Input, Output } from '@angular/core';
import { FileArchivo } from '../modelos/archivoimagen';

@Directive({
  selector: '[appNgDropFilesDirective]'
})
export class NgDropFilesDirectiveDirective {

  @Input() fileArchivoInput: FileArchivo[] = [];
  @Output() mouseSobre: EventEmitter<boolean> = new EventEmitter();
  @Input() Cambio = false;
  constructor() { }

  @HostListener('dragover', ['$event'])
  public onDragEnter(event: any) {
    this.mouseSobre.emit(true);
    this._PrevenirDetener(event);
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(event: any) {
    this.mouseSobre.emit(false);
  }

  @HostListener('drop', ['$event'])
  public onDrop(event: any) {
    const transferencia = this._getTransferencia(event);

    if (!transferencia) {
      return;
    }

    this._extraerArchivos(transferencia.files);
    this._PrevenirDetener(event);
    this.mouseSobre.emit(false);

  }

  private _getTransferencia(event: any) {
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }

  private _extraerArchivos(archivosLista: FileList) {
    for (const propiedad in Object.getOwnPropertyNames(archivosLista)) {
      const archivoTemporal = archivosLista[propiedad];

      if (this._ArchivoCargado(archivoTemporal)) {
        const TempArchivo = new FileArchivo(archivoTemporal);
        this.fileArchivoInput.push(TempArchivo);

      }
    }
  }

  // Validar carga 
  private _ArchivoCargado(archivo: File): boolean {
    if (!this._DuplicarArchivo(archivo.name) && this._SoloImagen(archivo.type)) {
      return true;
    } else {
      return false;
    }
  }

  //prevenir que el navegador abra el archivo
  private _PrevenirDetener(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  //prevenir achivos doblicados   
  private _DuplicarArchivo(nombreArchivo: string): boolean {
    for (const archivo of this.fileArchivoInput) {
      if (archivo.nombreArchivo === nombreArchivo) {
      
        return true;
      }
    }
    return false;
  }

  //prevenir archivos que no sean imagenes
  private _SoloImagen(tipoArchivo: string): boolean {
    return (tipoArchivo === '' || tipoArchivo === undefined) ? false : tipoArchivo.startsWith('image');
  }

}
