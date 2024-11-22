import { Component } from '@angular/core';

import { Images } from '../../../../assets/data/images';
import { DatetimeHelper } from '../../../../common/helpers/datetime.helper';


@Component({
  selector: 'public-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class PublicFooterComponent {
  public readonly currentYear: number = DatetimeHelper.currentYear;
  public mainLogo: string = Images.mainLogo;
}
