import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DragAndDropService {
  draggedItem: any;
  dragTarget: any;

  constructor() {}

  startDraggingItem(item: any) {
    this.draggedItem = item;
  }

  dropItem(): any {
    const draggedItem = this.draggedItem;
    this.draggedItem = null;

    return draggedItem;
  }

  dragEnter(target: any) {
    this.dragTarget = target;
  }

  dragLeave() {
    this.dragTarget = null;
  }
}
