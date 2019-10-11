import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {ServiciosModel} from '../components/modulos/servicios/servicios.model';
import {ResponseBasePageModel} from '../components/modulos/widgets/responseBasePage.model';
import {ResponseBaseServiciosListModel} from '../components/modulos/servicios/responseBaseServiciosList.model';


@Injectable()
export class ServiciosService {

  readonly urlEndPoint = '/pronet-backend/api/servicios';

  private httpHeaders: HttpHeaders;

  constructor(private http: HttpClient, private router: Router) {
  }

  getAll() {
    this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get<ServiciosModel[]>(
      this.urlEndPoint, {headers: this.httpHeaders});
  }

  getServicios(page: number, size: number, campo: string, orden: string) {
    this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get<ResponseBasePageModel>(
      this.urlEndPoint + `/page?page=${page}&size=${size}&sort=${campo},${orden}`, {headers: this.httpHeaders});
  }

  getServicios2() {
    this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get<ResponseBaseServiciosListModel>(
      this.urlEndPoint, {headers: this.httpHeaders});
  }

  create(servicio: ServiciosModel): Observable<ServiciosModel> {
    return this.http.post<ServiciosModel>(this.urlEndPoint, servicio).pipe(
      map((response: any) => response.servicio as ServiciosModel),
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

  getServicio(id: number): Observable<ServiciosModel> {
    return this.http.get<ServiciosModel>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if (e.status !== 401 && e.error.mensaje) {
          this.router.navigate(['/servicios']);
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  update(servicio: ServiciosModel): Observable<any> {
    return this.http.put<any>(this.urlEndPoint, servicio).pipe(
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

  delete(id: number): Observable<ServiciosModel> {
    return this.http.delete<ServiciosModel>(`${this.urlEndPoint}/${id}`).pipe(
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
