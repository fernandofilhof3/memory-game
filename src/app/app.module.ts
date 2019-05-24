import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MainScreenComponent } from './main-screen/main-screen.component';
import { DispositionCardsPipe } from './pipes/disposition-cards.pipe';
import { ModalVictoryComponent } from './modals/modal-victory/modal-victory.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    MainScreenComponent,
    DispositionCardsPipe,
    ModalVictoryComponent
  ],
  imports: [
    BrowserModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  providers: [],
  entryComponents: [ModalVictoryComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
