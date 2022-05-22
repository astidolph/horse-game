import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { horseNames } from 'src/assets/horse-names';
import { Horse } from '../classes/horse';

const RACE_LENGTH = 40;
const NUM_HORSES = 10;
const NUM_RANDOMISED_ODDS_PER_HORSE = 10;

@Injectable({
  providedIn: 'root'
})
export class HorseManagementService {

  private _horses: Horse[] = [];
  private _results: string[] = [];
  private _raceStarted = new BehaviorSubject<boolean>(false);
  private totalOdds = 0;
  private oddsTable: Horse[] = [];

  get raceStarted(): Observable<boolean> {
    return this._raceStarted.asObservable();
  }

  setRaceStarted(val: boolean) {
    this._raceStarted.next(val);
  }

  get horses() {
    return this._horses;
  }

  get results() {
    return this._results;
  }

  constructor() { }

  generateHorses() {
    for (let i = 1; i < NUM_HORSES + 1; i++) {
      this.horses.push(
        {
          name: this.getHorseName(),
          odds: this.generateOdds(),
          oddsDisplay: "",
          colour: this.randomiseColour(),
          speed: 0
        }
      )
    }

    this.totalOdds = this.horses.reduce((acc, obj) => acc + obj.odds, 0);
    console.log(this.totalOdds);

    this.horses.forEach(h => h.oddsDisplay = this.generateDisplayOdds(this.totalOdds, h.odds));

    this.generateOddsTable();
  }

  private getHorseName(): string {
    let nameFound = false;
    let horseName = "";

    while(!nameFound) {
      let randomHorseNameIndex = Math.floor(Math.random() * horseNames.length);
      horseName = horseNames[randomHorseNameIndex];

      if (!this.horses.some(x => x.name === horseName))
        nameFound = true;
    }
    return horseName;
  }

  private generateOdds(): number {
    return Math.floor((Math.random() * NUM_RANDOMISED_ODDS_PER_HORSE) + 1);
  }

  public generateResults(): void {
    this.setRaceStarted(true);
    let runningTotalOdds = this.totalOdds;
    let runningOddsTable = this.oddsTable;

    for (let i = 0; i < NUM_HORSES; i++) {
      console.log(runningTotalOdds);
      console.log(runningOddsTable);
      // horse finished
      let horseFinishedIndex = Math.floor(Math.random() * runningTotalOdds);
      console.log("number picked" + horseFinishedIndex);
      let horseThatFinished = runningOddsTable[horseFinishedIndex];

      console.log(horseThatFinished);

      // push horse into results table
      this.results.push(horseThatFinished.name);

      this.setHorseSpeed(NUM_HORSES - i, horseThatFinished);

      // remove all entries of finished horse from odds table
      runningOddsTable = runningOddsTable.filter(x => x.name !== horseThatFinished.name);

      // adjust odds total
      runningTotalOdds = runningTotalOdds - horseThatFinished.odds;
    }
  }

  private randomiseColour() {
    const letters = '0123456789ABCDEF';
    let colour = "#";
    for (var i = 0; i < 6; i++) {
      colour += letters[Math.floor(Math.random() * 16)];
    }
    return colour;
  }

  private generateDisplayOdds(totalOdds: number, odd: number): string {
    let percentageOdds = odd/totalOdds * 100;
    return `(${percentageOdds.toFixed(1)}%)`;
  }

  private generateOddsTable() {
    this.horses.forEach(h => {
      for (let i = 0; i < h.odds; i++) {
        this.oddsTable.push(h);
      }
    });
  }

  private setHorseSpeed(finishPlace: number, horse: Horse): void {
    let horseFound = this.horses.find(x => x.name === horse.name);

    if (!horseFound) {
      console.log('Couldnt find the horse to give speed');
      return;
    }

    horseFound.speed = RACE_LENGTH - finishPlace;
  }
}
