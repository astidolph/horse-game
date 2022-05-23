import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorseFinishResultsComponent } from './horse-finish-results.component';

describe('HorseFinishResultsComponent', () => {
  let component: HorseFinishResultsComponent;
  let fixture: ComponentFixture<HorseFinishResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HorseFinishResultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HorseFinishResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
