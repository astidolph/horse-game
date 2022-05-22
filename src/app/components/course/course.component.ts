import { Component, Input, OnInit } from '@angular/core';
import { Horse } from 'src/app/classes/horse';
import { HorseManagementService } from 'src/app/services/horse-management.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent {
  horses: Horse[] = [];
  raceStarted = false;

  constructor(private horseManagementService: HorseManagementService) {
    this.horses = this.horseManagementService.horses;
    this.raceStarted = this.horseManagementService.raceStarted;
   }

   getHorseSpeed(speed: number): string {
     return `myfirst ${speed}s forwards`;
   }

}
