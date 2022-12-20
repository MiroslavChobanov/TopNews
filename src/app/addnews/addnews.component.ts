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
  showAdd !: boolean;
  showUpdate !: boolean;

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

  clickAddNews(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
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

  onEdit(row: any){
    this.showAdd = false;
    this.showUpdate = true;

    this.newsModelObj.id = row.id;
    this.formValue.controls['name'].setValue(row.name);
    this.formValue.controls['field'].setValue(row.field);
    this.formValue.controls['author'].setValue(row.author);
    this.formValue.controls['date'].setValue(row.date);
  }

  updateNewsDetails(){
    this.newsModelObj.name=this.formValue.value.name;
    this.newsModelObj.field=this.formValue.value.field;
    this.newsModelObj.author=this.formValue.value.author;
    this.newsModelObj.date=this.formValue.value.date;

    this.api.updateNews(this.newsModelObj, this.newsModelObj.id)
    .subscribe(res=>{
      alert("Updated successfully.");
      let ref = document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getAllNews();
    })
  }
}
