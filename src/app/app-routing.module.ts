
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PetManagementComponent } from './components/pet-management/pet-management.component';
import { AuthGuard } from './guard/auth.guard';
import { OwnerManagementComponent } from './components/owner-management/owner-management.component';
import { OwnerEditComponent } from './components/owner-management/owner-edit/owner-edit.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent},
  { path: 'pet-management', component: PetManagementComponent, canActivate: [AuthGuard] },
  { path: 'owner-management', component: OwnerManagementComponent },
  { path: 'owner-edit', component: OwnerEditComponent},
  { path: 'register', component: RegisterComponent},
 // { path: 'owner-management/:ownerId/pets', component: OwnerPetsManagementComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' }
  //{ path: 'login', loadChildren: () => import('./components/login/login.module').then(m => m.LoginModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
