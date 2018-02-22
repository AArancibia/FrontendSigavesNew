import {Component, OnInit, ViewChild} from '@angular/core';
import {RequerimientoService} from "../../services/service.index";
import {CentroCosto} from "../../model/CentroCosto";
import {DatatableComponent} from "../../shared/datatable/datatable.component";
import {ActivatedRoute, Params} from "@angular/router";
declare var $: any;
@Component({
  selector: 'app-requerimientos',
  templateUrl: './requerimientos.component.html',
  styleUrls: ['./requerimientos.component.css']
})
export class RequerimientosComponent implements OnInit {

  @ViewChild(DatatableComponent)
  private dataTableComponent: DatatableComponent;
  data: any = [];
  loading: boolean = true;
  termino: string = '';
  centroCostoh3: string;
  CentroCosto: CentroCosto[];
  codCcosto: any;

  constructor(public reqService: RequerimientoService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.getCabeceraFromCentro(14);
    $('#mdate').bootstrapMaterialDatePicker({
      weekStart: 0, time: false,
      format : 'DD/MM/YYYY'
    });
  }


  buscarCentroCosto() {
    if (this.termino.length == 0) {
      return;
    }
    this.reqService.getCentroCosto(this.termino)
      .subscribe(
        (result) => this.CentroCosto = result
      );
  }

  getCabeceraFromCentro(codcentroCosto) {
    console.log(codcentroCosto);
    this.reqService.getCabeceraCentroCosto(codcentroCosto)
      .subscribe(
        (result) => {
          this.data = result;
          console.log(this.data);
          if(this.dataTableComponent) {
            this.dataTableComponent.rerender();
          }
        },
        (error) => {
          console.log('Hubo un error', error);
        },
        () => {
          this.termino = '';
          console.log(codcentroCosto);
          this.loading = false;
          this.centroCostoh3 = this.data.descripcion;
        }
      );
  }

  editDetalleReq(data) {
    console.log(data);
  }

  deleteDetalleReq(data) {

  }

  getCabeceraSAC() {
    this.loading = true;
    this.reqService.getDataCabeceraSAC()
      .subscribe((result) => {
          this.data = result;
          if(this.dataTableComponent) {
            this.dataTableComponent.rerender();
          }
        },
        (error) => console.log('Error'),
        () => this.loading = false
      );
  }

}
