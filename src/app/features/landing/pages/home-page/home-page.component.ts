import { Component } from '@angular/core';
import { LandingPageSections } from '../../landing-pages-data';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  sectionContent = LandingPageSections
}
