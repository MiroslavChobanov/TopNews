import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  public loginForm !: FormGroup;

  constructor(private formBuilder : FormBuilder, private http: HttpClient, private router : Router) {
    localStorage.clear();
  }

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      email:['',Validators.required],
      password:['', Validators.required]
    })
  }
  login(){


    this.http.get<any>("http://localhost:3000/userList")
    .subscribe(res=>{
      const user = res.find((a:any)=>{
        return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
      });
      if(user){
        alert("Login successful");
        if(this.loginForm.value.email == "admin@gmail.com"){
          localStorage.setItem('userType','admin')
      }
        this.loginForm.reset();
        this.router.navigate(['topnews']);
      }else{
        alert("User not found.");
      }
    },err=>{
      alert("Something went wrong.");
    })
  }
}
