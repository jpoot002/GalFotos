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
  

  ObservableAlbun: Observable<Albun[]>;
  
  ObservableImagen: Observable<Imagen[]>;
  FocoGuardadoCompleto: number = 0;

  private itemsCollection: AngularFirestoreCollection<any>;


  constructor( private AngularFirestore: AngularFirestore) { 
  }

  private customSubject = new Subject<any>();
  customObservable = this.customSubject.asObservable();

  private CargaImagenes( NombreAlbun:string ){
    this.itemsCollection =  this.AngularFirestore.collection<Imagen>(NombreAlbun);
    this.ObservableImagen = this.itemsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Imagen;
        const idarchivo = a.payload.doc.id;
        return { idarchivo, ...data };
      }))
    );
  }

  public CargarGuardadoImagenesFirebase( imagenes: FileArchivo[], NombreAlbun:string  ) {
    const storageRef = firebase.storage().ref();
    for ( const Imagen of imagenes ) {

      Imagen.estaSubiendo = true;
      if ( Imagen.progreso >= 100 ) {
        continue;
      }
      const uploadTask: firebase.storage.UploadTask =
                  storageRef.child(`${ NombreAlbun }/${ Imagen.nombreArchivo }`)
                            .put( Imagen.archivo );
                            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
                              (snapshot: firebase.storage.UploadTaskSnapshot) => Imagen.progreso = (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
                              (error) => console.error('Error al subir', error),
                              () => {                       
                                uploadTask.snapshot.ref.getDownloadURL()
                                  .then((url) => {
                                    Imagen.url = url;
                                    Imagen.estaSubiendo = false;
                                    this.FocoGuardadoCompleto = this.FocoGuardadoCompleto + 1;
                                    this.GuardarImagenFirebase({
                                      nombre: Imagen.nombreArchivo,
                                      url: Imagen.url,
                                      fecha: Imagen.fecha
                                  },NombreAlbun);  
                                  this.FinalizarGuardado(this.FocoGuardadoCompleto, imagenes.length);                             
                                });
                              }                            
                            );
    }

  }


  private GuardarImagenFirebase( imagen: { nombre: string, url: string,  fecha:Date } , NombreAlbun:string ) {

    this.AngularFirestore.collection(`/${ NombreAlbun }` )
    .add( Object.assign({}, imagen));
  }

  private EliminarFirestore(Nombre:string, Id:number, NombreAlbun:string ){
    this.AngularFirestore.collection<Imagen>(NombreAlbun).doc(String(Id)).delete().then(()=> {
      console.log(Nombre, 'Borrada de la base de datos');
    }).catch(function(error) {
      console.error('Error al eliminar ', Nombre);
    })
  }
  
  private EliminiarStorage(Nombre:string, Id:number, NombreAlbun:string ){
    const storageRef = firebase.storage().ref();
    storageRef.child(`${ NombreAlbun}/${ Nombre }`).delete().then(()=> {
      console.log(Nombre, 'Borrada de la base de datos');
    }).catch(function(error) {
      console.error('Error al eliminar ', Nombre);
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
    this.CargarAlbun();
    return this.ObservableAlbun
  }
  
  public ListaImagenes( NombreAlbun:string  ):any{
    this.CargaImagenes(NombreAlbun);
    return this.ObservableImagen;
  }
  
  public Eliminar(Nombre:string, Id:number, NombreAlbun:string ){
    this.EliminarFirestore(Nombre,Id, NombreAlbun);
    this.EliminiarStorage(Nombre,Id, NombreAlbun);
  }

  public FinalizarGuardado(Conteo:number, Length:number) {
      if(Conteo==Length){
        this.customSubject.next("guardado finalizado");
      }
  }

 

}
