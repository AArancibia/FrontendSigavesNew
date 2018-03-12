import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {Observable, BehaviorSubject} from "rxjs/Rx";
import {Http} from "@angular/http";
import {CabeceraSac} from "../../model/CabeceraSac";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {CentroCosto} from "../../model/CentroCosto";
import {CabDetalleSac} from "../../model/CabDetalleSac";
import {UnidadVehicular} from "../../model/UnidadVehicular";

@Injectable()
export class RequerimientoService {


  private CabeceraSacUrl  = '/api/Csac';
  private CentroCostoUrl  = '/api/CCosto';
  private CabeceraDetSacUrl  = '/api/CDSac';
  private UnidadVehicularUrl  = '/api/UnidVehicular';
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  getDataCabeceraSAC(): Observable<CabeceraSac[]> {
    const url = `${this.CabeceraSacUrl}/CabeceraSac`;
    return this.http.get(url)
      .map((res: Response) => res)
      .catch((error: any) => Observable.throw(error.json().error || 'Server Error'));
  }

  getCabeceraDetalleSac(id): Observable<CabDetalleSac[]> {
    const url = `${this.CabeceraDetSacUrl}/CabeceraSac/${id}/CabecDetalleSac`;
    return this.http.get(url)
      .map((res: Response) => res)
      .catch((error: any) => Observable.throw(error.json().error || 'Server Error'));
  }

  getDataCabeceraSACById(id): Observable<CabeceraSac[]> {
    const url = `${this.CabeceraSacUrl}/CabeceraSac/${id}`;
    return this.http.get(url)
      .map((res: Response) => res)
      .catch((error: any) => Observable.throw(error.json().error || 'Server Error'));
  }

  getCuadroNecedidades(): Observable<any[]> {
    const url = `${this.CentroCostoUrl}/cuadroxcosto`;
    return this.http.get(url)
      .map((res: Response) => res)
      .catch((error: any) => Observable.throw(error.json().error || 'Server Error'));
  }

  getCentroCosto(termino: string): Observable<CentroCosto[]> {
    const url = `${this.CentroCostoUrl}/CentroCosto/${termino}/descripcion`;
    return this.http.get(url)
      .map((res: Response) => res)
      .catch((error: any) => Observable.throw(error.json().error || 'Server Error'));
  }

  getCabeceraCentroCosto(centroCosto): Observable<CabeceraSac[]> {
    const url = `${this.CentroCostoUrl}/CentroCosto/${centroCosto}/CabeceraSac`;
    return this.http.get(url)
      .map((res: Response) => res)
      .catch((error: any) => Observable.throw(error.json().error || 'Server Error'));
  }

  getUnidadesVehiculares(): Observable<UnidadVehicular[]> {
    const url = `${this.UnidadVehicularUrl}`;
    return this.http.get(url)
      .map((res: Response) => res)
      .catch((error: any) => Observable.throw(error.json().error || 'Server Error'));
  }
}
