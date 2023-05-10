import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddModelDialogComponent } from './add-model-dialog.component';

describe('AddModelDialogComponent', () => {
  let component: AddModelDialogComponent;
  let fixture: ComponentFixture<AddModelDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddModelDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddModelDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
