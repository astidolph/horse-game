import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Horse } from 'src/app/classes/horse';
import { HorseManagementService } from 'src/app/services/horse-management.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent {
  horses: Horse[] = [];
  raceStarted = new Observable<boolean>();
  timingFunction = '';

  constructor(private horseManagementService: HorseManagementService) {
    this.horses = this.horseManagementService.horses;
    this.raceStarted = this.horseManagementService.raceStarted;
  }

   getHorseSpeed(speed: number, timingFunction: string): string {
     return `horseMove ${timingFunction} ${speed}s forwards`;
   }

}
