import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Horse } from 'src/app/classes/horse';
import { HorseManagementService } from 'src/app/services/horse-management.service';

@Component({
  selector: 'app-odds-panel',
  templateUrl: './odds-panel.component.html',
  styleUrls: ['./odds-panel.component.scss']
})
export class OddsPanelComponent {

  horses: Horse[] = [];
  results: string[] = [];

  public raceStarted = false;

  constructor(private horseManagementService: HorseManagementService) {
    this.horses = this.horseManagementService.horses;
    this.results = this.horseManagementService.results;
    this.raceStarted = this.horseManagementService.raceStarted;
  }

  public startRace() {
    this.horseManagementService.generateResults();
  }

}
