import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Find your Doctor...';
  isbuttondisabled = false;
  inputVal=""
  location={
    Chennai:{
      lat:13.0478223,
      long:80.0689263
    },
    Banglore:{
      lat:12.9542946,
      long:77.4908541
    }
  }
  doctorsList 

  constructor(private http:HttpClient){       /* private http:HttpClient  ==> var http = new HttpClient()*/

  }

  enableButton(value){
    if(value!=null){
      this.isbuttondisabled = false
    }
  }

  searchdoc(){
    this.http.get(`http://localhost:3001/finddoctor/${this.location[this.inputVal].lat}/${this.location[this.inputVal].long}`)
    .subscribe((data)=>{
      this.doctorsList = data;
    })
    /** http get returns an Observable. Similar to a promises then and catch, we have [Success, Error, Complete]
     * 
     */
//  alert(`lat: ${this.location[this.inputVal].lat}, long: ${this.location[this.inputVal].long}`)
  }

}
