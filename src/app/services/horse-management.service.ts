import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { horseNames } from 'src/assets/horse-names';
import { Horse } from '../classes/horse';

const RACE_LENGTH = 90;
const NUM_HORSES = 10;
const NUM_RANDOMISED_ODDS_PER_HORSE = 100;
const HORSE_FINISH_TIME_DIFFERENCIAL = 40;

@Injectable({
  providedIn: 'root'
})
export class HorseManagementService {

  private _horses: Horse[] = [];
  private _results: Horse[] = [];
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
          speed: 0,
          timingFunction: this.timingFunction()
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
    // Create speed vector
    const orderedHorseSpeeds = this.speedVector();

    for (let i = 0; i < NUM_HORSES; i++) {
      // horse finished
      let horseFinishedIndex = Math.floor(Math.random() * this.totalOdds);
      let horseThatFinished = this.oddsTable[horseFinishedIndex];

      console.log(`${horseThatFinished.name} in ${i} place`);

      this.setHorseSpeed(orderedHorseSpeeds[i], horseThatFinished);

      // push horse into results table
      this.results.push(horseThatFinished);

      // remove all entries of finished horse from odds table
      this.oddsTable = this.oddsTable.filter(x => x.name !== horseThatFinished.name);

      // adjust odds total
      this.totalOdds = this.totalOdds - horseThatFinished.odds;
    }

    this.setRaceStarted(true);
  }

  private speedVector() {
    let speeds: number[] = [];
    for (let i = 0; i < NUM_HORSES; i++) {
      speeds.push(RACE_LENGTH - HORSE_FINISH_TIME_DIFFERENCIAL + (Math.floor(Math.random() * HORSE_FINISH_TIME_DIFFERENCIAL)));
    }
    console.log(speeds);
    return speeds.sort((a, b) => a - b);
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

  private setHorseSpeed(speed: number, horse: Horse): void {
    let horseFound = this.horses.find(x => x.name === horse.name);

    if (!horseFound) {
      console.log('Couldnt find the horse to give speed');
      return;
    }

    horseFound.speed = speed;
  }

  private timingFunction(): string {
    let point1 = (0.8 + (Math.random() * 0.2 * (Math.round(Math.random()) ? 1 : -1)));
    let point2 = (0.5 + (Math.random() * 0.5 * (Math.round(Math.random()) ? 1 : -1)));
    let point3 = (0.6 + (Math.random() * 0.1 * (Math.round(Math.random()) ? 1 : -1)));
    let point4 = 1;

    return `cubic-bezier(${point1},${point2},${point3},${point4})`;
  }
}
