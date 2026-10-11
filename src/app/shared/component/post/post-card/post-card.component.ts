import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Ipost } from 'src/app/shared/model/post';
import { PostServiceService } from 'src/app/shared/service/post-service.service';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {
  @Input () getData !: Ipost
  @Output () delData : EventEmitter<string> = new EventEmitter<string>()
  constructor(
    private _postService : PostServiceService
  ) { }

  ngOnInit(): void {
  }

  onEdit(getData : Ipost){
    this._postService.editPOstSub$.next(getData)
  }

  onRemove(id : string) {
    this._postService.onRemove(id)
    .subscribe({
      next : res => {
        this.delData.emit(id)
      },
      error : err => {
        console.log(err)
      }
    })
   
  }
}
