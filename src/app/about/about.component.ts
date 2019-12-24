import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.sass']
})
export class AboutComponent implements OnInit {
  public itemName: string = '';
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    //parammap observable method
    this.route.paramMap.subscribe(params => {
      this.itemName = params.get("name");
    });

    //snapshot method for once no update value
   // this.itemName = this.route.snapshot.params.name;
  }

}
