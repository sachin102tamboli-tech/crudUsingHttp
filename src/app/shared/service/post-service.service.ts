import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { observable, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ipost, IpostRes, respons } from '../model/post';

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {
  BASE_URL = environment.BASE_URL
  POST_URL = `${this.BASE_URL}/post2.json`
  editPOstSub$ : Subject<Ipost> = new Subject<Ipost>()
  // editPostObs$ : Observable<Ipost> = this.editPOstSub$.asObservable()
  constructor(
    private _http : HttpClient
  ) { }

  onFetch() : Observable<IpostRes> {
    return this._http.get<IpostRes>(this.POST_URL)
  }

  onSubmit(newObj : Ipost) : Observable<respons> {
    return this._http.post<respons>(this.POST_URL, newObj)
  }

  // public onEdit(editObj : Ipost) {
  //   return this.editPOstSub$.next(editObj)
  // }

  onUpdate(updatObj : Ipost) : Observable<Ipost> {
    let updtUrl = `${this.BASE_URL}/post2/${updatObj.id}.json`
    return this._http.put<Ipost>(updtUrl, updatObj)
  }

  onRemove (id : string){
    let removeUrl = `${this.BASE_URL}/post2/${id}.json`
    return this._http.delete<Ipost>(removeUrl)
  }
}
