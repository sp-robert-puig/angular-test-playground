import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { InlineComponent } from './inline-component/inline-component.component'
import { AppComponent } from './app.component';
import { ExternalComponent } from './external-component/external-component.component';

@NgModule({
  declarations: [
    AppComponent,
    InlineComponent,
    ExternalComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
