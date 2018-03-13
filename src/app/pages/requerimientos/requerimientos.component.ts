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
import {CNecesidadesxCCosto} from "../../model/CNecesidadesxCCosto";
import {UnidadVehicular} from "../../model/UnidadVehicular";

@Component({
  selector: 'app-requerimientos',
  templateUrl: './requerimientos.component.html',
  styleUrls: ['./requerimientos.component.css']
})
export class RequerimientosComponent implements OnInit {

  @ViewChild(DatatableComponent)
  private dataTableComponent: DatatableComponent;
  data: any = []; // Para datos de Cabecera de Requerimientos (DataTable)
  cuadroNecesidades: CNecesidadesxCCosto[];
  cuadroNecesSel: CNecesidadesxCCosto ;
  dataCabDet: CabDetalleSac[];
  DetalleCabSac: CabDetalleSac;
  dataUVehicular: UnidadVehicular[];
  loading: boolean = true;
  termino: string = '';
  centroCostoh3: string;
  CentroCosto: CentroCosto[];
  codCcosto: any;
  CabeceraSac: CabeceraSac;
  scroller = new SweetScroll();
  today: any = moment().format('DD/MM/YYYY');
  itemNuevoReq: boolean = true;
  unidadMovil: boolean = false;
  unidadPersonal: boolean = false;
  infoDataVehiculo: string;

  constructor(public reqService: RequerimientoService,
              private route: ActivatedRoute) {
    this.CabeceraSac = new CabeceraSac;
    this.cuadroNecesSel = new CNecesidadesxCCosto;
    this.DetalleCabSac = new CabDetalleSac;
  }

  ngOnInit() {
    $('#dos').hide(500);
    moment.locale('es');
    this.getCabeceraFromCentro(14,'');
    $('#mdate').bootstrapMaterialDatePicker({
      weekStart: 0, time: false,
      format : 'DD/MM/YYYY'
    });
    this.codCcosto = 14;
  }

  getCabeceraFromCentro(codcentroCosto, des) {
    this.reqService.getCabeceraCentroCosto(codcentroCosto)
      .subscribe(
        (result) => {
          this.data = result;
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
          this.codCcosto = codcentroCosto;
        }
      );
  }

  accionItemReq(data) {
    $('#uno').hide( 500);
    $('#dos').show( 500);
    $('#umovil').prop('checked', false);
    $('#upersonal').prop('checked', false);
    this.unidadPersonal = false;
    this.unidadMovil = false;
    if (data === 'nuevo') {
      console.log('Estamos en un nuevo Item de Requerimiento');
      this.DetalleCabSac = new CabDetalleSac;
      this.cuadroNecesSel = new CNecesidadesxCCosto;
    }else {
      this.DetalleCabSac = data;
      console.log(this.DetalleCabSac);
      this.cuadroNecesSel.descripcion = this.DetalleCabSac.descripcion;
      this.cuadroNecesSel.partidaPre = this.DetalleCabSac.partida;
      //servicio para llamar ala uni vehicular por codigo
    }

  }

  seleccionArticulo(cn) {
    console.log(cn);
    this.cuadroNecesSel = cn;
    //this.DetalleCabSac.codArticulo(actividadOperativa) = cn.actividadOperativaId;
    $('#exampleModal2').modal('hide');
  }

  seleccionUM(uv) {
    console.log(uv);
    this.infoDataVehiculo = 'Placa: ' + uv.placa + ' |  ' + uv.descripcion;
    this.DetalleCabSac.idCodvehicular = uv.idCodvehicular;
    console.log(this.DetalleCabSac.idCodvehicular);
  }

  accion(dato:any) {
    if (dato === 'vacio') {
      let anio = moment().year().toString();
      let ccosto = this.codCcosto;
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
      if (this.data.length <= 0 ) {
        this.CabeceraSac.idcabeSac = 1;
      }else {
        let ultimo = this.data.length - 1;
        this.CabeceraSac.idcabeSac = this.data[ultimo].idcabeSac;
        this.CabeceraSac.idcabeSac++;
        console.log(this.CabeceraSac.idcabeSac);
      }
      let myNumber = this.CabeceraSac.idcabeSac;
      var formattedNumber = ("00" + myNumber).slice(-3);
      var ccostoformat = ('00' + ccosto).slice(-3);
      let id = anio + ccostoformat + formattedNumber;
      this.CabeceraSac.idcabeSac = Number(id);

    }else {
      this.reqService.getDataCabeceraSACById(dato.trim())
        .subscribe(
        (res:any) => {
          this.CabeceraSac = res;
        }
      )

      this.itemNuevoReq = false;
      this.getCabecerDetSac(dato);
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
    this.dataCabDet = [];
  }

  tabListado() {
    this.itemNuevoReq = true;
    this.dataCabDet = [];
  }

  getCuadroNecesidades() {
    this.reqService.getCuadroNecedidades()
      .subscribe(
        (result) => {
          this.cuadroNecesidades = result;
        }
      );
  }

  togglecierra() {
    $('#uno').show(500);
    $('#dos').hide(500);
    this.DetalleCabSac = new CabDetalleSac;//sacar por DetCabecera
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

  getUnidadMovil() {
    this.reqService.getUnidadesVehiculares().
      subscribe(
      (res) => {
       this.dataUVehicular = res;
      },
      (error) => {
        console.log('Error Compare');
      },
      () => {
        console.log('Completoo');
      }
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

  unidadM() {
    this.unidadMovil = !this.unidadMovil;
  }

  unidadP() {
    this.unidadPersonal = !this.unidadPersonal;
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


}
