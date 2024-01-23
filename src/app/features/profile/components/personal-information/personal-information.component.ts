import { Component } from '@angular/core';
import { countries } from '../../countries-data';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.scss']
})
export class PersonalInformationComponent {
  countries = countries
}
