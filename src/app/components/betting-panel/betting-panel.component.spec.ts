import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BettingPanelComponent } from './betting-panel.component';

describe('BettingPanelComponent', () => {
  let component: BettingPanelComponent;
  let fixture: ComponentFixture<BettingPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BettingPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BettingPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
