import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  OpenExpertDataBaseAdmin() {
    window.location.href = "mailto:ExpertDatabase@eurofins.com?subject=Expert Database | New Request(s)";
  }
}
