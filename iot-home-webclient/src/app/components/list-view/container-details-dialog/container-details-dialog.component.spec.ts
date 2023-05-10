import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerDetailsDialogComponent } from './container-details-dialog.component';

describe('ContainerDetailsDialogComponent', () => {
  let component: ContainerDetailsDialogComponent;
  let fixture: ComponentFixture<ContainerDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContainerDetailsDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContainerDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
