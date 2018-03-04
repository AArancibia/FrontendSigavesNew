import {Component, OnInit, ViewChild} from '@angular/core';
import {RequerimientoService} from "../../services/service.index";
import {CentroCosto} from "../../model/CentroCosto";
import {DatatableComponent} from "../../shared/datatable/datatable.component";
import {ActivatedRoute, Params} from "@angular/router";
import {CabeceraSac} from "../../model/CabeceraSac";
declare var $: any;
import * as moment from 'moment';
import SweetScroll from 'sweet-scroll';
import {CabDetalleSac} from "../../model/CabDetalleSac";
import {PipeCuadroNecesidadesPipe} from "../../pipes/pipe-cuadro-necesidades.pipe";

@Component({
  selector: 'app-requerimientos',
  templateUrl: './requerimientos.component.html',
  styleUrls: ['./requerimientos.component.css']
})
export class RequerimientosComponent implements OnInit {

  @ViewChild(DatatableComponent)
  private dataTableComponent: DatatableComponent;
  data: any = [];
  cuadroNecesidades:any = [];
  dataCabDet: CabDetalleSac[];
  loading: boolean = true;
  termino: string = '';
  centroCostoh3: string;
  CentroCosto: CentroCosto[];
  codCcosto: any;
  CabeceraSac: CabeceraSac;
  scroller = new SweetScroll();
  today: any = moment().format('DD/MM/YYYY');
  itemNuevoReq: boolean = true;

  constructor(public reqService: RequerimientoService,
              private route: ActivatedRoute) {
    this.CabeceraSac = new CabeceraSac;
  }

  ngOnInit() {
    $('#dos').hide(500);
    moment.locale('es');
    this.getCabeceraFromCentro(14,'');
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

  getCabeceraFromCentro(codcentroCosto, des) {
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
          this.loading = true;
        },
        () => {
          this.termino = '';
          this.loading = false;
          this.centroCostoh3 = des;
        }
      );
  }

  editDetalleReq(data) {
    console.log(data);
    $('#uno').hide( 500);
    $('#dos').show( 500);
  }

  accion(dato:any) {
    if (dato === 'vacio') {
      this.itemNuevoReq = false;
      dato = {};
      let h = this.today;
      this.today = h;
      let hoy = $('#mdate').bootstrapMaterialDatePicker({
        setDate: h
      });
      this.cuadroNecesidades = [];
      this.CabeceraSac = dato;
      this.CabeceraSac.fechaSac = h;
    }else {
      this.CabeceraSac = dato;
      this.itemNuevoReq = false;
      this.getCabecerDetSac(dato.idcabeSac);
    }
    $('#profile2').toggleClass('active');
    $('#home2').toggleClass('active');
    $('a#home22.nav-link.active')
      .removeClass('active');
    $('a#profile22.nav-link').addClass('active');
    //this.scroller.to('#cardList');
  }

  cancelarReq() {
    this.itemNuevoReq = true;
    $('#home2').toggleClass('active');
    $('#profile2').toggleClass('active');
    $('a#profile22.nav-link.active')
      .removeClass('active');
    $('a#home22.nav-link').addClass('active');
  }

  getCuadroNecesidades() {
    this.reqService.getCuadroNecedidades()
      .subscribe(
        (result) => {
          console.log(result);
          this.cuadroNecesidades = result;
        }
      );
  }

  togglecierra() {
    $('#uno').show(500);
    $('#dos').hide(500);
  }

  deleteDetalleReq(data) {

  }

  getCabecerDetSac(id) {
    this.reqService.getCabeceraDetalleSac(id)
      .subscribe(
        (result) => {
          this.dataCabDet = result;
          console.log(this.dataCabDet);
        },
        (err) => console.log(err)
      );
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
