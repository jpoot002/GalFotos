import { EventEmitter, Injectable, Output } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as firebase from "firebase";
import { FileArchivo } from '../../modelos/archivoimagen';
import { Imagen}  from '../../modelos/imagen'
import { Albun }  from '../../modelos/albun'
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagenesService {
  
  private CARPETA_IMAGENES:string = 'img';

  ObservableAlbun: Observable<Albun[]>;
  
  ObservableImagen: Observable<Imagen[]>;
  FocoGuardadoCompleto: number = 0;

  private itemsCollection: AngularFirestoreCollection<any>;


  constructor( private AngularFirestore: AngularFirestore) { 
    this.CargaImagenes();
    this.CargarAlbun();
  }

  private customSubject = new Subject<any>();
  customObservable = this.customSubject.asObservable();

  private CargaImagenes(){
    this.itemsCollection =  this.AngularFirestore.collection<Imagen>(this.CARPETA_IMAGENES);
    this.ObservableImagen = this.itemsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Imagen;
        const idarchivo = a.payload.doc.id;
        return { idarchivo, ...data };
      }))
    );
  }

  public CargarGuardadoImagenesFirebase( imagenes: FileArchivo[] ) {
    const storageRef = firebase.storage().ref();
    for ( const item of imagenes ) {

      item.estaSubiendo = true;
      if ( item.progreso >= 100 ) {
        continue;
      }
      const uploadTask: firebase.storage.UploadTask =
                  storageRef.child(`${ this.CARPETA_IMAGENES }/${ item.nombreArchivo }`)
                            .put( item.archivo );
                            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
                              (snapshot: firebase.storage.UploadTaskSnapshot) => item.progreso = (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
                              (error) => console.error('Error al subir', error),
                              () => {                       
                                uploadTask.snapshot.ref.getDownloadURL()
                                  .then((url) => {
                                    item.url = url;
                                    item.estaSubiendo = false;
                                    this.FocoGuardadoCompleto = this.FocoGuardadoCompleto + 1;
                                    this.GuardarImagenFirebase({
                                      nombre: item.nombreArchivo,
                                      url: item.url,
                                      fecha: item.fecha
                                  });  
                                  this.FinalizarGuardado(this.FocoGuardadoCompleto, imagenes.length);                             
                                });
                              }                            
                            );
    }

  }


  private GuardarImagenFirebase( imagen: { nombre: string, url: string,  fecha:Date } ) {

    this.AngularFirestore.collection(`/${ this.CARPETA_IMAGENES }` )
    .add( Object.assign({}, imagen));
  }

  private EliminarFirestore(nombre:string, id:number){
    this.AngularFirestore.collection<Imagen>(this.CARPETA_IMAGENES).doc(String(id)).delete().then(()=> {
      console.log(nombre, 'Borrada de la base de datos');
    }).catch(function(error) {
      console.error('Error al eliminar ', nombre);
    })
  }
  
  private EliminiarStorage(nombre:string, id:number){
    const storageRef = firebase.storage().ref();
    storageRef.child(`${ this.CARPETA_IMAGENES }/${ nombre }`).delete().then(()=> {
      console.log(nombre, 'Borrada de la base de datos');
    }).catch(function(error) {
      console.error('Error al eliminar ', nombre);
    })
  }

  private CargarAlbun(){
    this.itemsCollection =  this.AngularFirestore.collection<Albun>("NombreAlbum");
    this.ObservableAlbun =  this.itemsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Albun;
        const idarchivo = a.payload.doc.id;
        return { idarchivo, ...data };
      }))
    );
  }

  public ListaAlbunes():any{
    console.log(this.ObservableAlbun);
    return this.ObservableAlbun
  }
  
  public ListaImagenes():any{
    return this.ObservableImagen;
  }
  
  public Eliminar(nombre:string, id:number){
    this.EliminarFirestore(nombre,id);
    this.EliminiarStorage(nombre,id);
  }

  public FinalizarGuardado(Conteo:number, Length:number) {
      if(Conteo==Length){
        this.customSubject.next("guardado finalizado");
      }
  }

  public NombreAlbun( NombreAlbun:string){
    this.CARPETA_IMAGENES = NombreAlbun;
  }

}
