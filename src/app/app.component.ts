import { Component } from '@angular/core';
import { horseNames } from 'src/assets/horse-names';
import { Horse } from './classes/horse';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public horses: Horse[] = [];
  private NUM_HORSES = 10;
  private totalOdds = 0;
  private oddsTable: Horse[] = [];
  public results: string[] = [];

  constructor() {
    for (let i = 1; i < this.NUM_HORSES + 1; i++) {
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

    this.horses.forEach(h => h.speed = this.getHorseSpeed(h.odds));

    this.horses.forEach(h => h.oddsDisplay = this.generateDisplayOdds(this.totalOdds, h.odds));

    this.generateOddsTable();
  }

  public startRace() {
    this.generateResults();
  }

  private getHorseName(): string {
    var nameFound = false;
    var horseName = "";

    while(!nameFound) {
      var randomHorseNameIndex = Math.floor(Math.random() * horseNames.length);
      horseName = horseNames[randomHorseNameIndex];

      if (!this.horses.some(x => x.name === horseName))
        nameFound = true;
    }
    return horseName;
  }

  private randomiseColour() {
    var letters = '0123456789ABCDEF';
    var colour = "#";
    for (var i = 0; i < 6; i++) {
      colour += letters[Math.floor(Math.random() * 16)];
    }
    return colour;
  }

  private generateOdds(): number {
    return Math.floor((Math.random() * 10) + 1);
  }

  private generateDisplayOdds(totalOdds: number, odd: number): string {
    var percentageOdds = odd/totalOdds * 100;
    return `(${percentageOdds.toFixed(1)}%)`;
  }

  private generateOddsTable() {
    this.horses.forEach(h => {
      for (let i = 0; i < h.odds; i++) {
        this.oddsTable.push(h);
      }
    });
  }

  private getHorseSpeed(speedScaling: number): number {
    return 0;
  }

  private generateResults(): void {
    var runningTotalOdds = this.totalOdds;
    var runningOddsTable = this.oddsTable;

    for (let i = 0; i < this.NUM_HORSES; i++) {
      console.log(runningTotalOdds);
      console.log(runningOddsTable);
      // horse finished
      var horseFinishedIndex = Math.floor(Math.random() * runningTotalOdds);
      console.log("number picked" + horseFinishedIndex);
      var horseThatFinished = runningOddsTable[horseFinishedIndex];

      console.log(horseThatFinished);

      // push horse into results table
      this.results.push(horseThatFinished.name);

      // remove all entries of finished horse from odds table
      runningOddsTable = runningOddsTable.filter(x => x.name !== horseThatFinished.name);

      // adjust odds total
      runningTotalOdds = runningTotalOdds - horseThatFinished.odds;
    }
  }

}


