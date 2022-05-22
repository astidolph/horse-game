import { Component, Input, OnInit } from '@angular/core';
import { Horse } from 'src/app/classes/horse';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent {
  @Input() horses: Horse[] = [];

  constructor() { }

}
