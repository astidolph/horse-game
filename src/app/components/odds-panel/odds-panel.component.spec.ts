import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OddsPanelComponent } from './odds-panel.component';

describe('OddsPanelComponent', () => {
  let component: OddsPanelComponent;
  let fixture: ComponentFixture<OddsPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OddsPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OddsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
