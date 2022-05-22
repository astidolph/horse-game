import { Component } from '@angular/core';
import { horseNames } from 'src/assets/horse-names';
import { Horse } from './classes/horse';
import { HorseManagementService } from './services/horse-management.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private horseManagementService: HorseManagementService) {
    this.horseManagementService.generateHorses();
  }

}


