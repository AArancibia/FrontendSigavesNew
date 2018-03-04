import {AfterViewInit, Component, EventEmitter, Input, NgZone, OnInit, Output, ViewChild} from "@angular/core";
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

  dtOptions: any = {};

  dtTrigger: Subject<any> = new Subject();
  @Input() data:any;
  @Output() seleccion: EventEmitter<any> = new EventEmitter();
  elimina: any;
  idioma_español = {
    "sProcessing": "Procesando...",
    "sLengthMenu": "Mostrar MENU registros",
    "sZeroRecords": "No se encontraron resultados",
    "sEmptyTable": "Ningún dato disponible en esta tabla",
    "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
    "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
    "sInfoFiltered": "(filtrado de un total de MAX registros)",
    "sInfoPostFix": '',
    "sSearch": "Buscar:",
    "sUrl": '',
    "sInfoThousands": ",",
    "sLoadingRecords": "Sin ningun Registro",
    "oPaginate": {
      "sFirst": "Primero",
      "sLast": "Último",
      "sNext": "Siguiente",
      "sPrevious": "Anterior"
    },
    "oAria": {
      "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
      "sSortDescending": ": Activar para ordenar la columna de manera descendente"
    }
  };

  constructor(private zone: NgZone) {}

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      // Declare the use of the extension in the dom parameter
      dom: 'Bfrtip',/*
      "columnDefs": [ {
        "targets": -1,
        "data": null,
        "defaultContent": "<button class='image-admin'><i class='fas fa-edit fa-2x '></i></button><button data-toggle=\"modal\" data-target=\"#exampleModal\" class='image-admin'><i class='fa fa-times fa-2x '></i></button>"
      } ],*/
      buttons: [
        'pdf',
        'excel',
        'print'
      ],
      language: this.idioma_español
    };
  }

  accion(data) {
    if (data === null) {
      this.seleccion.emit('vacio');
      return;
    }
    this.seleccion.emit(data);

  }

  eliminar(data) {
    this.elimina = data;
  }

  someClickHandler(info: any): void {
    console.log(info);
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
