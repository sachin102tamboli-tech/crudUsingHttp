import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Ipost } from 'src/app/shared/model/post';
import { PostServiceService } from 'src/app/shared/service/post-service.service';
import { GetConfirmComponent } from '../../get-confirm/get-confirm.component';
import { SnackbarService } from 'src/app/shared/service/snackbar.service';

@Component({
  selector: 'app-post-dash',
  templateUrl: './post-dash.component.html',
  styleUrls: ['./post-dash.component.scss']
})
export class PostDashComponent implements OnInit {
  postArr : Ipost[] =[]
  constructor(
    private _postService : PostServiceService,
    private _matDialog : MatDialog,
    private _snackbar : SnackbarService
  ) { }

  ngOnInit(): void {
    this.onFetch()
  }

  onFetch(){
    this._postService.onFetch()
    .subscribe ({
      next : res => {
        for (const key in res) {
          this.postArr.unshift(
            {...res[key],
          id : key})
        }
      },
      error : err => {
        console.log(err)
      }

    })
  } 

  onSubmit(newObj : Ipost) {
    this.postArr.unshift(newObj)
    this._snackbar.snackbar(`The Post Record ${newObj.title} is Added Successfully!!`)
  }

  onUpdt(updtObj : Ipost) {
    let getIndex = this.postArr.findIndex(l => l.id === updtObj.id)
    this.postArr[getIndex] = updtObj
    this._snackbar.snackbar(`The Post Record ${updtObj.title} is Modified Successfully!!`)
  }

  onRemove(id : string){
    let config = new MatDialogConfig()
    config.width ='500px'
    config.maxWidth = '700px'
    let _matDialofRef = this._matDialog.open(GetConfirmComponent)
    _matDialofRef.afterClosed().subscribe(flag => {
      if(flag){
        let getIndex = this.postArr.findIndex(m => m.id === id)
        this.postArr.splice(getIndex, 1)
        this._snackbar.snackbar(`The Post Record With Id ${id} is Removed Successfully!!`)
      }
    })
    
    
    
    
    
  }
}
