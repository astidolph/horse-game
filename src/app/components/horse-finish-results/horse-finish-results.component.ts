import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Horse } from 'src/app/classes/horse';
import { HorseManagementService } from 'src/app/services/horse-management.service';

@Component({
  selector: 'app-horse-finish-results',
  templateUrl: './horse-finish-results.component.html',
  styleUrls: ['./horse-finish-results.component.scss']
})
export class HorseFinishResultsComponent {
  results: Horse[] = [];
  staggeredResults: Horse[] = [];
  staggeredResults$ = new Subject<Horse[]>();

  constructor(private horseManagementService: HorseManagementService) { 
    this.results = this.horseManagementService.results;

    this.results.forEach(r => {
        setTimeout(() => {
        this.staggeredResults.push(r);
        this.staggeredResults$.next(this.staggeredResults);
      }, r.speed * 1000)
    });
  }

}
