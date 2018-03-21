import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  constructor(private _httpService: HttpService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    this.deleteAuthorFromService();
  }

  deleteAuthorFromService(){
    this._route.params.subscribe((params: Params) => {
      let observable = this._httpService.deleteProduct(params['id']);
      observable.subscribe(data => {
        console.log("Deleted Author from Database");
        this._router.navigate(['/list']);
      })
    })
  }
}
