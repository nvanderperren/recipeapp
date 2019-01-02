import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, PreloadingStrategy, PreloadAllModules } from '@angular/router';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { SelectivePreloadStrategy } from './SelectivePreloadStrategy';

const appRoutes: Routes = [
  {
    path: 'recipe',
    loadChildren: 'src/app/recipe/recipe.module#RecipeModule',
    data: { preload: true }
  },
  // { path: '', redirectTo: 'recipe/list', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes,
    { preloadingStrategy: SelectivePreloadStrategy })],
  declarations: [],
  providers: [SelectivePreloadStrategy],
  exports: [RouterModule]
})
export class AppRoutingModule { }
