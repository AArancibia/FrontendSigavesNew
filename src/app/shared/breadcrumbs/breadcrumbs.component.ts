import { Component, OnInit } from '@angular/core';
import {Location} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  constructor(private _location: Location, private router: Router) { }

  ngOnInit() {
  }

  goBack() {
    this.router.navigate(['/Requerimiento/']);
  }

}
