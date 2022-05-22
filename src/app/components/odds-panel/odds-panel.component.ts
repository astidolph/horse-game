import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Horse } from 'src/app/classes/horse';

@Component({
  selector: 'app-odds-panel',
  templateUrl: './odds-panel.component.html',
  styleUrls: ['./odds-panel.component.scss']
})
export class OddsPanelComponent {

  @Input() horses: Horse[] = [];
  @Input() results: string[] = [];

  @Output() startRaceEmitter = new EventEmitter<boolean>();

  public raceStarted = false;

  constructor() { }

  startRace() {
    this.raceStarted = true;
    this.startRaceEmitter.next(true);
  }

}
