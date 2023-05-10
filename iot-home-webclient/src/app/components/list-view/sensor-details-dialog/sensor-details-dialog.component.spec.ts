import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorDetailsDialogComponent } from './sensor-details-dialog.component';

describe('SensorDetailsDialogComponent', () => {
  let component: SensorDetailsDialogComponent;
  let fixture: ComponentFixture<SensorDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SensorDetailsDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SensorDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
