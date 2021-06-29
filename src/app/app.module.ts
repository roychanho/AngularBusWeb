import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchRouteComponent } from './search-route/search-route.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SearchStopComponent } from './search-stop/search-stop.component';
import { CreateBusComponent } from './create-bus/create-bus.component';
import { UpdateBusComponent } from './update-bus/update-bus.component';
import { DeleteBusComponent } from './delete-bus/delete-bus.component';

@NgModule({
  declarations: [
    AppComponent,
    // routingComponents,
    SearchRouteComponent,
    SearchStopComponent,
    CreateBusComponent,
    UpdateBusComponent,
    DeleteBusComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
