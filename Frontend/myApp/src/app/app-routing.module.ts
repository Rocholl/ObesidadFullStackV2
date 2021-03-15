import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'map',
    loadChildren: () => import('./map/map.module').then( m => m.MapPageModule)
  },
  {
    path: 'municipios',
    loadChildren: () => import('./municipios/municipios.module').then( m => m.MunicipiosPageModule)
  },
  {
    path: 'user-page',
    loadChildren: () => import('./user-page/user-page.module').then( m => m.UserPagePageModule)
  },
  {
    path: 'form-health',
    loadChildren: () => import('./form-health/form-health.module').then( m => m.FormHealthPageModule)
  },
  {
    path: 'help-page',
    loadChildren: () => import('./help-page/help-page.module').then( m => m.HelpPagePageModule)
  },
  {
    path: 'user-class-students',
    loadChildren: () => import('./user-class-students/user-class-students.module').then( m => m.UserClassStudentsPageModule)
  },
  {
    path: 'average-table',
    loadChildren: () => import('./average-table/average-table.module').then( m => m.AverageTablePageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
