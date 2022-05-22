import { Component } from '@angular/core';
import { PlayerBets, PlayerHorseBet } from 'src/app/classes/player-bets';
import { BettingService } from 'src/app/services/betting.service';

@Component({
  selector: 'app-bet-results',
  templateUrl: './bet-results.component.html',
  styleUrls: ['./bet-results.component.scss']
})
export class BetResultsComponent {
  public playerBets: PlayerBets[] = [];

  constructor(private bettingService: BettingService) {
    this.playerBets = this.bettingService.playerBets;
  }

  public sumPlayerBets(bets: PlayerHorseBet[]) {
    return bets
      .map(x => x.bet)
      .reduce((acc, val) => acc + val);
  }

  public getHorsesBetOn(playerBets: PlayerBets): PlayerHorseBet[] {
    return playerBets.bets.filter(x => x.bet != 0);
  }

}
