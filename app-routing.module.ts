import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CatalogComponent } from './catalog/catalog.component';
import { CreateComponent } from './create/create.component';
import { DetailsComponent } from './details/details.component';
import { AuthGuard } from './auth.guard';
import { GuestGuard } from './public-auth.guard'; 
import { EditComponent } from './edit/edit.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'catalog', component: CatalogComponent },
  { path: 'create', component: CreateComponent}, 
  { path: 'register', component: RegisterComponent, canActivate: [GuestGuard] }, 
  { path: 'login', component: LoginComponent, canActivate: [GuestGuard] }, 
  { path: 'details/:id', component: DetailsComponent}, 
  { path: 'edit/:id', component: EditComponent}, 
  { path: 'profile', component: ProfileComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}