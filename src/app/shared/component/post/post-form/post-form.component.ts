import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ipost } from 'src/app/shared/model/post';
import { PostServiceService } from 'src/app/shared/service/post-service.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {
  isINEditMode : boolean = false
  editId !: string
  @ViewChild('postForm') postForm !: NgForm

  @Output() emitNewObj : EventEmitter<Ipost> = new EventEmitter <Ipost>() 
  @Output() emitUpdtObj : EventEmitter<Ipost> = new EventEmitter <Ipost>()
  constructor(
    private _postService : PostServiceService
  ) { }

  ngOnInit(): void {
    this.onEdit()
  }
  onSubmit() {
    if(this.postForm.valid) {
      let newObj = this.postForm.value
      this._postService.onSubmit(newObj)
      .subscribe({
        next : res => {
          newObj.id = res.name
          this.emitNewObj.emit(newObj)
          this.postForm.reset()
        },
        error : err => {
          console.log(err )
        }

      })
    }
  }
  onEdit(){
    this._postService.editPOstSub$
    .subscribe({
      next : res =>{
        if(res){
        this.isINEditMode = true
        this.editId = res.id
        this.postForm.form.patchValue(res)
      }
}
    })
  }

  onUpdate() {
    if(this.postForm.valid){
      let updatObj = this.postForm.value
      updatObj.id =this.editId
      this._postService.onUpdate(updatObj)
      .subscribe({
        next : res => {
          this.emitUpdtObj.emit(updatObj)
          this.postForm.reset()
          this.isINEditMode = false
        },
        error : err => {
          console.log(err)
        }
      })
    }
  }
} 
