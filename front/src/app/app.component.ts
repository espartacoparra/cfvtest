import { Component, OnInit } from '@angular/core';
import { environment } from "../environments/environment";
import { LogService } from "../app/services/log.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  title = 'confecciones-valentinas-front';
  constructor(private logsevice: LogService) { }

  ngOnInit(): void {
    this.logsevice.loadSession();
  }

  onActivate(event) {
    window.scroll(0, 0);
    //or document.body.scrollTop = 0;
    //or document.querySelector('body').scrollTo(0,0)
  }


}
