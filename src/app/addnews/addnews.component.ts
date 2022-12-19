import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { NewsModel } from './addnews.model';

@Component({
  selector: 'app-addnews',
  templateUrl: './addnews.component.html',
  styleUrls: ['./addnews.component.scss']
})
export class AddnewsComponent implements OnInit{
  formValue !: FormGroup;
  newsModelObj: NewsModel = new NewsModel();
  newsData !: any;
  constructor(private formbuilder: FormBuilder, private api  : ApiService) {

  }
  
  ngOnInit(): void{
    this.formValue = this.formbuilder.group({
      name : [''],
      field : [''],
      author : [''],
      date : [''],
    })
    this.getAllNews();
  }

  postNewsDetails(){
    this.newsModelObj.name=this.formValue.value.name;
    this.newsModelObj.field=this.formValue.value.field;
    this.newsModelObj.author=this.formValue.value.author;
    this.newsModelObj.date=this.formValue.value.date;

    this.api.postNews(this.newsModelObj)
    .subscribe(res=>{
      console.log(res);
      alert("News has been added successfully.")
      let ref = document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getAllNews();
    },
    err=>{
      alert('Someting went wrong.');
    })
  }

  getAllNews(){
    this.api.getNews()
    .subscribe(res=>{
      this.newsData = res;
    })
  }

  deleteNews(row: any){
    this.api.deleteNews(row.id)
    .subscribe(res=>{
      alert("News deleted");
      this.getAllNews();
    })
  }
}
