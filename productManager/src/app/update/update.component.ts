import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  editProduct: any;

  constructor(private _httpService: HttpService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    this.populateEditField();
  }

  editProductFromService(){
    let observable = this._httpService.updateProduct(this.editProduct.id, this.editProduct);
    observable.subscribe(data => {
      console.log("Message Received: ", data);
      this.editProduct = {id: "", title: "", price: "", image: ""};
      this._router.navigate(['/list']);
    })
  }

  populateEditField(){
    this._route.params.subscribe((params: Params) => {
      let observable = this._httpService.getOneProduct(params['id']);
      observable.subscribe(data => {
        this.editProduct = {id: params['id'], title: data['data'].title, price: data['data'].price, image: data['data'].image};
      })
    })
  }
}
