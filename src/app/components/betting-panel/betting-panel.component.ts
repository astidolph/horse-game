import { Component, OnInit } from '@angular/core';
import { Horse } from 'src/app/classes/horse';
import { PlayerBets, PlayerHorseBet } from 'src/app/classes/player-bets';
import { HorseManagementService } from 'src/app/services/horse-management.service';
import { playerNames } from 'src/assets/player-names';

@Component({
  selector: 'app-betting-panel',
  templateUrl: './betting-panel.component.html',
  styleUrls: ['./betting-panel.component.scss']
})
export class BettingPanelComponent {
  public players: string[] = [];
  public horses: Horse[] = [];
  public playerBets: PlayerBets[] = [];
  public selectedPlayersBet: PlayerBets | undefined = undefined;

  constructor(private horseManagementService: HorseManagementService) {
    this.players = playerNames;
    this.horses = this.horseManagementService.horses;

    this.playerBets = this.players.map(x => new PlayerBets(x, this.horses.map(x => new PlayerHorseBet(x, 0))));

    this.selectedPlayersBet = this.playerBets[0];
  }

  selectPlayersBets(player: string) {
    this.selectedPlayersBet = this.playerBets.find(x => x.player === player);
  }

  setPlayerBet(player: string, horse: Horse, bet: number) {
    let foundPlayersBets = this.playerBets.find(x => x.player === player)?.bets;

    if (foundPlayersBets === undefined) {
      console.log(`Player ${player} tried to bet ${bet} on ${horse}: Couldn't find players bets`);
      return;
    }

    let horseToBetOn = foundPlayersBets.find(x => x.horse.name === horse.name);

    if (horseToBetOn === undefined) {
      console.log(`Player ${player} tried to bet ${bet} on ${horse}: Couldn't find players horse to bet on`);
      return;
    }
    
    horseToBetOn.bet = bet;
  }

}
