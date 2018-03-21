import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  newProduct: any;

  constructor(private _httpService: HttpService, private _router: Router) { }

  ngOnInit() {
    this.newProduct = {title: "", price: "", img: ""};
  }

  addProductFromService(){
    let observable = this._httpService.addProduct(this.newProduct);
    observable.subscribe(data => {
      console.log("Added new Product!", data);
      this.newProduct = {title: "", price: "", img: ""};
      this._router.navigate(['/list']);
    })
  }
}
