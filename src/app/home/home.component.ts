import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../Api/api.service';
import { HttpResponse } from '@angular/common/http';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit, OnDestroy {
  public productList:Array<any> = [];
  private destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private api: ApiService) { }

  ngOnInit() {
    this.getProducts();
  }

  public getProducts() {
    //without pagination this will work
      // this.api.get().subscribe((data: any[]) => {
      //   console.log("TCL: HomeComponent -> getProducts -> data", data);
      //   this.productList = data;
      // });
      this.api.get().pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<any>) => {
        console.log("TCL: HomeComponent -> getProducts -> res", res);
        this.productList = res.body;
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  public firstPage() {
    this.productList = [];
    this.api.getRequestToURl(this.api.first).pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<any>) => {
      console.log("TCL: HomeComponent -> getProducts -> res", res);
      this.productList = res.body;
    });
  }

  public lastPage() {
    console.log(this.api.last)
    this.productList = [];
    this.api.getRequestToURl(this.api.last).pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<any>) => {
      console.log("TCL: HomeComponent -> getProducts -> res", res);
      this.productList = res.body;
    });
  }

  public prevPage() {
    if(this.api.prev !== undefined && this.api.prev !== '') {
      this.productList = [];
      this.api.getRequestToURl(this.api.prev).pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<any>) => {
        console.log("TCL: HomeComponent -> getProducts -> res", res);
        this.productList = res.body;
      });
    }
  }

  public nextPage() {
    if(this.api.next !== undefined && this.api.next !== '') {
      this.productList = [];
      this.api.getRequestToURl(this.api.next).pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<any>) => {
        console.log("TCL: HomeComponent -> getProducts -> res", res);
        this.productList = res.body;
      });
    }
  }

}
