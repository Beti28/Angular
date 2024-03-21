import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { CatalogComponent } from './catalog/catalog.component';
import { CreateComponent } from './create/create.component';
import { DetailsComponent } from './details/details.component';
import { DataService } from './shared/data.service';
import { EditComponent } from './edit/edit.component';



@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    CreateComponent,
    CatalogComponent,
    DetailsComponent,
    EditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    AngularFireModule.initializeApp(environment.firebase),
    FormsModule,
    ReactiveFormsModule
   ],
  //provideFirebaseApp(() => initializeApp({"projectId":"angular-softuni-project-21b88","appId":"1:147986316750:web:f71e429729a9d8fee07f9f","storageBucket":"angular-softuni-project-21b88.appspot.com","apiKey":"AIzaSyB0BLEPahUCpf0FIfejuqJV37x238pZ4Xk","authDomain":"angular-softuni-project-21b88.firebaseapp.com","messagingSenderId":"147986316750","measurementId":"G-S07HMHV82K"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideDatabase(() => getDatabase()), provideStorage(() => getStorage())
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }