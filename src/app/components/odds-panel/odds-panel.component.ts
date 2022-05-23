import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Horse } from 'src/app/classes/horse';
import { PlayerBets, PlayerHorseBet } from 'src/app/classes/player-bets';
import { BettingService } from 'src/app/services/betting.service';
import { HorseManagementService } from 'src/app/services/horse-management.service';

@Component({
  selector: 'app-odds-panel',
  templateUrl: './odds-panel.component.html',
  styleUrls: ['./odds-panel.component.scss']
})
export class OddsPanelComponent {

  horses: Horse[] = [];
  results: Horse[] = [];
  public raceStarted = new Observable<boolean>();


  constructor(private horseManagementService: HorseManagementService) {
    this.horses = this.horseManagementService.horses;
    this.results = this.horseManagementService.results;
    this.raceStarted = this.horseManagementService.raceStarted;
  }

  public startRace() {
    this.horseManagementService.generateResults();
  }

}
