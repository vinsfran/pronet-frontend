import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {DeudasModel} from '../components/modulos/deudas/deudas.model';
import {ResponseBasePageModel} from '../components/modulos/widgets/responseBasePage.model';


@Injectable()
export class DeudasService {

  readonly urlEndPoint = '/pronet-backend/api/deudas';

  private httpHeaders: HttpHeaders;

  constructor(private http: HttpClient, private router: Router) {
  }

  getAll() {
    this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get<DeudasModel[]>(
      this.urlEndPoint, {headers: this.httpHeaders});
  }

  getDeudas(page: number, size: number, campo: string, orden: string) {
    this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get<ResponseBasePageModel>(
      this.urlEndPoint + `/page?page=${page}&size=${size}&sort=${campo},${orden}`, {headers: this.httpHeaders});
  }

  create(prestamo: DeudasModel): Observable<DeudasModel> {
    return this.http.post<DeudasModel>(this.urlEndPoint, prestamo).pipe(
      map((response: any) => response.prestamo as DeudasModel),
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

  getPrestamo(id: number): Observable<DeudasModel> {
    return this.http.get<DeudasModel>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if (e.status !== 401 && e.error.mensaje) {
          this.router.navigate(['/deudas']);
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  update(prestamo: DeudasModel): Observable<any> {
    return this.http.put<any>(this.urlEndPoint, prestamo).pipe(
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

  delete(id: number): Observable<DeudasModel> {
    return this.http.delete<DeudasModel>(`${this.urlEndPoint}/${id}`).pipe(
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
