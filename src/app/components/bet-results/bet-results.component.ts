import { Component } from '@angular/core';
import { Horse } from 'src/app/classes/horse';
import { PlayerBets, PlayerHorseBet } from 'src/app/classes/player-bets';
import { BettingService } from 'src/app/services/betting.service';
import { HorseManagementService } from 'src/app/services/horse-management.service';

@Component({
  selector: 'app-bet-results',
  templateUrl: './bet-results.component.html',
  styleUrls: ['./bet-results.component.scss']
})
export class BetResultsComponent {
  public playerBets: PlayerBets[] = [];
  public winningHorse: Horse | undefined = undefined;

  constructor(private bettingService: BettingService, private horseManagementService: HorseManagementService) {
    this.playerBets = this.bettingService.playerBets;
    this.winningHorse = this.horseManagementService.results[0];
  }

  public sumPlayerBets(bets: PlayerHorseBet[]) {
    return bets
      .map(x => x.bet)
      .reduce((acc, val) => acc + val);
  }

  public getHorsesBetOn(playerBets: PlayerBets): PlayerHorseBet[] {
    return playerBets.bets.filter(x => x.bet != 0);
  }

  public calculateWinnings(playerBets: PlayerHorseBet[]) {
    var totalBet: number = playerBets.reduce((acc, val) => acc + val.bet, 0);
    console.log('total' + totalBet);
    var betOnWinningHorse = playerBets.find(x => x.horse.name === this.winningHorse?.name);

    if (betOnWinningHorse === undefined) {
      return -totalBet;
    } else {
      return (betOnWinningHorse.bet * betOnWinningHorse.horse.decimalOdds) - totalBet;
    }

  }

}
