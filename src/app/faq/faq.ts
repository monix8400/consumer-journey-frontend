import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'faq',
  templateUrl: './faq.html',
  styleUrls: ['./faq.css']
})
export class Faq implements OnInit {

  responseData: any;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.http.get<any[]>('http://localhost:8080/faq')
      .subscribe(data => {
        this.responseData = data;
      });
  }

}
