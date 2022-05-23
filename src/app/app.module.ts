import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CourseComponent } from './components/course/course.component';
import { BettingPanelComponent } from './components/betting-panel/betting-panel.component';
import { BetResultsComponent } from './components/bet-results/bet-results.component';
import { OrderByOddsPipe } from './pipes/orderByPipe';
import { OddsPanelComponent } from './components/odds-panel/odds-panel.component';
import { HorseFinishResultsComponent } from './components/horse-finish-results/horse-finish-results.component';

@NgModule({
  declarations: [
    AppComponent,
    CourseComponent,
    OddsPanelComponent,
    BettingPanelComponent,
    BetResultsComponent,
    OrderByOddsPipe,
    HorseFinishResultsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
