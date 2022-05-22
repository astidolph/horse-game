import { Component, OnInit } from '@angular/core';
import { Horse } from 'src/app/classes/horse';
import { PlayerBets, PlayerHorseBet } from 'src/app/classes/player-bets';
import { BettingService } from 'src/app/services/betting.service';
import { HorseManagementService } from 'src/app/services/horse-management.service';
import { playerNames } from 'src/assets/player-names';

@Component({
  selector: 'app-betting-panel',
  templateUrl: './betting-panel.component.html',
  styleUrls: ['./betting-panel.component.scss']
})
export class BettingPanelComponent {
  public players: string[] = [];
  public playerBets: PlayerBets[] = [];
  public selectedPlayersBet: PlayerBets | undefined = undefined;

  constructor(private horseManagementService: HorseManagementService, private bettingService: BettingService) {
    this.players = playerNames;
    var horses = this.horseManagementService.horses;

    this.bettingService.createPlayerBetsModel(this.players, horses);

    this.playerBets = this.bettingService.playerBets;

    this.selectedPlayersBet = this.playerBets[0];
  }

  selectPlayersBets(player: string) {
    this.selectedPlayersBet = this.playerBets.find(x => x.player === player);
  }

  setPlayerBet(player: string, horse: Horse, bet: number) {
    this.bettingService.setPlayerBet(player, horse, bet);
  }

}
