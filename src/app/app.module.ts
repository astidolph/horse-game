import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CourseComponent } from './components/course/course.component';
import { OddsPanelComponent } from './components/odds-panel/odds-panel.component';
import { BettingPanelComponent } from './components/betting-panel/betting-panel.component';
import { BetResultsComponent } from './components/bet-results/bet-results.component';

@NgModule({
  declarations: [
    AppComponent,
    CourseComponent,
    OddsPanelComponent,
    BettingPanelComponent,
    BetResultsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
