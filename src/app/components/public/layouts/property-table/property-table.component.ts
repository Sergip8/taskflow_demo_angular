import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { DatetimeHelper } from '../../../_core/helpers/datetime.helper';
import { Images } from '../../../../assets/data/images';
import { Comment, CommentHeader } from '../../../models/comments';
import { CommentComponent } from '../comment/comment.component';
import { StarHeaderComponent } from '../comment/comment-header-stars';
import { StarScoreComponent } from '../details-main-info-card/star-score';
import { CommentFormComponent } from '../comment/comment-form';
import { CommentService } from '../../../_core/services/comment.service';
import { GroupedProperties } from '../../../models/product';


@Component({
  selector: 'property-tables',
  standalone: true,
  imports: [CommentComponent, StarHeaderComponent, StarScoreComponent, CommentFormComponent],
  templateUrl: './property-table.component.html',
  styleUrl: './property-table.component.css',
})
export class PropertyTableComponent {

  private commentService = inject(CommentService)

  @Input() properties!: GroupedProperties[]
 
  constructor(){

  }

 
}
