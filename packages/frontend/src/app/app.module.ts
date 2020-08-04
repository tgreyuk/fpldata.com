import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsModule } from '@ngxs/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppState } from './core/store/store.state';
import { LookupModule } from './lookup/lookup.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    LookupModule,
    HttpClientModule,
    AppRoutingModule,
    NgxsModule.forRoot([AppState], {
      developmentMode: true,
    }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
