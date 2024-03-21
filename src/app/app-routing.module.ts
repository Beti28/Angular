import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CatalogComponent } from './catalog/catalog.component';
import { CreateComponent } from './create/create.component';
import { DetailsComponent } from './details/details.component';
import { AuthGuard } from './auth.guard';
import { PublicAuthGuard } from './public-auth.guard';
import { EditComponent } from './edit/edit.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'catalog', component: CatalogComponent },
  { path: 'create', component: CreateComponent}, // Protected route
  { path: 'register', component: RegisterComponent }, // Public route
  { path: 'login', component: LoginComponent }, // Public route
  { path: 'details/:id', component: DetailsComponent },
  { path: 'edit/:id', component: EditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}