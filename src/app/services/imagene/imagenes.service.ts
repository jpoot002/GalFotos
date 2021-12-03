import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as firebase from "firebase";
import { FileArchivo } from '../../modelos/archivoimagen';
import { Imagen}  from '../../modelos/imagen'
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ImagenesService {
  
  private CARPETA_IMAGENES = 'img';
  imagen: Imagen[] = [];
  items: Observable<Imagen[]>;

  private itemsCollection: AngularFirestoreCollection<Imagen>;

  constructor( private AngularFirestore: AngularFirestore ) { 
    this.CargaImagenes();
  }

  private CargaImagenes(){
    this.itemsCollection =  this.AngularFirestore.collection<Imagen>('img');
    this.items = this.itemsCollection.snapshotChanges().pipe(
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
                                
                                    this.GuardarImagenFirebase({
                                      nombre: item.nombreArchivo,
                                      url: item.url,
                                      fecha: item.fecha
                                      
                                  });
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
      console.log(nombre, ' borrada de la base de datos');
    }).catch(function(error) {
      console.error('Error al eliminar ', nombre);
    })
  }
  
  private EliminiarStorage(nombre:string, id:number){
    const storageRef = firebase.storage().ref();
    storageRef.child(`${ this.CARPETA_IMAGENES }/${ nombre }`).delete().then(()=> {
      console.log(nombre, ' borrada de la base de datos');
    }).catch(function(error) {
      console.error('Error al eliminar ', nombre);
    })
  }

  ngOnInit() {
  }

  public listaImagenes():any{
    return this.items;
  }
  
  public Eliminar(nombre:string, id:number){
    this.EliminarFirestore(nombre,id);
    this.EliminiarStorage(nombre,id);
  }

}
