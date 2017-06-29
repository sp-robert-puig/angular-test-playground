import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { InlineComponent } from './inline-component/inline-component.component'
import { AppComponent } from './app.component';
import { ExternalComponent } from './external-component/external-component.component';
import { AngularTestComponent } from './angular-test/angular-test.component';

@NgModule({
  declarations: [
    AppComponent,
    InlineComponent,
    ExternalComponent,
    AngularTestComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
