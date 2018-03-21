import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) { }

  getProducts(){
    return this._http.get('/allproducts');
  }

  addProduct(newProduct){
    return this._http.post('/products', newProduct);
  }

  deleteProduct(id){
    return this._http.delete('/products/' + id);
  }

  getOneProduct(id){
    return this._http.get('/products/' + id);
  }

  updateProduct(id, updateProduct){
    return this._http.put('/products/' + id, updateProduct);
  }
}
