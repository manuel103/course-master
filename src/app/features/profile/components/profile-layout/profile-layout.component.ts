import { Component } from '@angular/core';
import { profileMenuItems } from '../../profile-data';

@Component({
  selector: 'app-profile-layout',
  templateUrl: './profile-layout.component.html',
  styleUrls: ['./profile-layout.component.scss']
})
export class ProfileLayoutComponent {
  selectedTab: number = 1;
  menuItems = profileMenuItems;

  selectTab(tabNumber: number): void {
    this.selectedTab = tabNumber;
  }
}
