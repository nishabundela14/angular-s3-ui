import { Component, OnInit } from '@angular/core';
import { MessageService } from './Api/message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'bloggers';
  public isLoggedIn: boolean = false;

  constructor(private message:MessageService) {}

  ngOnInit() {
    this.message.getMessage().subscribe((data) => {
        this.isLoggedIn = data;
    });
  }
}
