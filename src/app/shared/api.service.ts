import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule} from '@angular/common/http';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  postNews(data: any){
    return this.http.post<any>("http://localhost:3000/posts", data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  getNews(){
    return this.http.get<any>("http://localhost:3000/posts")
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  updateNews(data: any, id: number){
    return this.http.put<any>("http://localhost:3000/posts/"+id,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  deleteNews(id: number){
    return this.http.delete<any>("http://localhost:3000/posts/" +id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}
