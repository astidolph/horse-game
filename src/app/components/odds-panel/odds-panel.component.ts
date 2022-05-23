import { Component, EventEmitter, Input, OnInit, Output, Pipe, PipeTransform } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Horse } from 'src/app/classes/horse';
import { HorseManagementService } from 'src/app/services/horse-management.service';

@Component({
  selector: 'app-odds-panel',
  templateUrl: './odds-panel.component.html',
  styleUrls: ['./odds-panel.component.scss']
})
export class OddsPanelComponent {
  horses: Horse[] = [];
  raceStarted = new Observable<boolean>();

  constructor(private horseManagementService: HorseManagementService) {
    this.horses = this.horseManagementService.horses;
    this.raceStarted = this.horseManagementService.raceStarted; 
  }

  public startRace() {
    this.horseManagementService.generateResults();
  }
}