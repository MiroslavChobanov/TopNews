import { BreakpointObserver} from '@angular/cdk/layout';
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'NewsApp';
  @ViewChild(MatSidenav) sideNav!: MatSidenav;

  constructor(private observer : BreakpointObserver) {

  }
  ngAfterViewInit(): void {
    this.sideNav.opened = true;
    this.observer.observe(['(max-width:787px)'])
    .subscribe((res)=>{
      if(res?.matches){
        this.sideNav.mode = "over";
        this.sideNav.close();
      }
      else{
        this.sideNav.mode = "side";
        this.sideNav.open();
      }
    })
  }
}
