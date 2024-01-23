import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DrawerService {
  private drawerStateSource = new BehaviorSubject<boolean>(false);
  currentDrawerState = this.drawerStateSource.asObservable();

  constructor() { }

  changeDrawerState(state: boolean) {
    this.drawerStateSource.next(state);
  }
}
