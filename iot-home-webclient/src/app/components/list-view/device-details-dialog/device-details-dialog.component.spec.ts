import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceDetailsDialogComponent } from './device-details-dialog.component';

describe('DeviceDetailsDialogComponent', () => {
  let component: DeviceDetailsDialogComponent;
  let fixture: ComponentFixture<DeviceDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceDetailsDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeviceDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
