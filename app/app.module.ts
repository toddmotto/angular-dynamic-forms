import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { DynamicFormModule } from './dynamic-form/dynamic-form.module';

@NgModule({
  imports: [
    BrowserModule,
    DynamicFormModule
  ],
  bootstrap: [
    AppComponent
  ],
  declarations: [
    AppComponent
  ]
})
export class AppModule {}
