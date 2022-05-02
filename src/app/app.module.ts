import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Component
import { ImagenesComponent } from './components/imagenes/imagenes.component';
import { CargaComponent } from './components/carga/carga.component';
import { AppComponent } from './app.component';

//Service
import { ImagenesService } from './services/imagene/imagenes.service';

//directives
import { NgDropFilesDirectiveDirective } from './directives/ng-drop-files-directive.directive';



@NgModule({
  declarations: [
    AppComponent,
    ImagenesComponent,
    CargaComponent,
    NgDropFilesDirectiveDirective,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule,
     BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ImagenesService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
