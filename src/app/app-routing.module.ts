import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchRouteComponent } from './search-route/search-route.component';
import { SearchStopComponent } from './search-stop/search-stop.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
