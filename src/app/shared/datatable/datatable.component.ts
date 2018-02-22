import {AfterViewInit, Component, Input, OnInit, ViewChild} from "@angular/core";
import {DataTableDirective} from "angular-datatables";
import {Subject} from "rxjs/Subject";

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styles: [`
        a > svg.svg-inline--fa {
            height:20px;
            width: 25px;
          }
  `]
})

export class DatatableComponent implements OnInit, AfterViewInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};

  dtTrigger: Subject<any> = new Subject();
  @Input() data:any;

  constructor() {}

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      // Declare the use of the extension in the dom parameter
      dom: 'Bfrtip'/*,
      // Configure the buttons
      buttons: [
        'copy',
        'excel'
      ]*/
    };
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

}
