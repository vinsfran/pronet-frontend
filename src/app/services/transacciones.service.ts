import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {TransaccionesModel} from '../components/modulos/transacciones/transacciones.model';
import {ResponseBasePageModel} from '../components/modulos/widgets/responseBasePage.model';
import {ResponseBasePantalla3Model} from '../components/modulos/pantalla3/responseBasePantalla3.model';


@Injectable()
export class TransaccionesService {

  readonly urlEndPoint = '/pronet-backend/api/transacciones';

  private httpHeaders: HttpHeaders;

  constructor(private http: HttpClient, private router: Router) {
  }

  getAll() {
    this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get<TransaccionesModel[]>(
      this.urlEndPoint + '/', {headers: this.httpHeaders});
  }

  getTransacciones(page: number, size: number, campo: string, orden: string) {
    this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get<ResponseBasePageModel>(
      this.urlEndPoint + `/page?page=${page}&size=${size}&sort=${campo},${orden}`, {headers: this.httpHeaders});
  }

  getTransaccionesPantalla2(fechaDesde: string, fechaHasta: string, page: number, size: number, campo: string, orden: string) {
    this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get<ResponseBasePageModel>(
      this.urlEndPoint + `/pantalla2?fecha_desde=${fechaDesde}&fecha_hasta=${fechaHasta}&page=${page}&size=${size}&sort=${campo},${orden}`,
      {headers: this.httpHeaders});
  }

  getTransaccionesPantalla3(fechaDesde: string, fechaHasta: string) {
    this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get<ResponseBasePantalla3Model>(
      this.urlEndPoint + `/pantalla3?fecha_desde=${fechaDesde}&fecha_hasta=${fechaHasta}`,
      {headers: this.httpHeaders});
  }

  create(transaccion: TransaccionesModel): Observable<TransaccionesModel> {
    return this.http.post<TransaccionesModel>(this.urlEndPoint, transaccion).pipe(
      map((response: any) => response.transaccion as TransaccionesModel),
      catchError(e => {
        if (e.status === 400) {
          return throwError(e);
        }
        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  get(id): Observable<TransaccionesModel> {
    return this.http.get<TransaccionesModel>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if (e.status !== 401 && e.error.mensaje) {
          this.router.navigate(['/transacciones']);
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  update(transaccion: TransaccionesModel): Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}`, transaccion).pipe(
      catchError(e => {
        if (e.status === 400) {
          return throwError(e);
        }
        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<TransaccionesModel> {
    return this.http.delete<TransaccionesModel>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  subirFoto(archivo: File, id): Observable<HttpEvent<{}>> {
    const formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('id', id);

    const req = new HttpRequest('POST', `${this.urlEndPoint}/upload`, formData, {
      reportProgress: true
    });

    return this.http.request(req);
  }

}
