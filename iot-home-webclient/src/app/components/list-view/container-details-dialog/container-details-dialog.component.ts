import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { isLocation } from 'src/app/utils/typeguards';

@Component({
  selector: 'app-container-details-dialog',
  templateUrl: './container-details-dialog.component.html',
  styleUrls: ['./container-details-dialog.component.scss'],
})
export class ContainerDetailsDialogComponent implements OnInit {
  @Input()
  visible: boolean = false;
  @Input()
  detailsTarget: any;
  @Output()
  visibleChange: EventEmitter<boolean> = new EventEmitter();
  @Output()
  onChangeDetailsTargetName: EventEmitter<string> = new EventEmitter();
  @Output()
  onDelete: EventEmitter<void> = new EventEmitter();

  get isDetailsTargetLocation(): boolean {
    return isLocation(this.detailsTarget);
  }

  constructor() {}

  ngOnInit(): void {}

  onVisibleChange(newVisibleValue: boolean): void {
    this.visibleChange.emit(newVisibleValue);
  }

  onChangeDetailsTargetNameFunc(newName: string | null) {
    if (newName) {
      this.onChangeDetailsTargetName.emit(newName);
    }
  }

  onDeleteClick() {
    this.onDelete.emit();
  }
}
