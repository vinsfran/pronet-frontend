import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {ClienteModel} from '../components/modulos/clientes/cliente.model';
import {ResponseBasePageModel} from '../components/modulos/widgets/responseBasePage.model';
import {ResponseBaseServiciosListModel} from '../components/modulos/servicios/responseBaseServiciosList.model';
import {ResponseBaseClientesTiposDocumentosModel} from '../components/modulos/clientes/responseBaseClientesTiposDocumentos.model';


@Injectable()
export class ClientesService {

  readonly urlEndPoint = '/pronet-backend/api/clientes';

  private httpHeaders: HttpHeaders;

  constructor(private http: HttpClient, private router: Router) {
  }

  getAll() {
    this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get<ClienteModel[]>(
      this.urlEndPoint + '/', {headers: this.httpHeaders});
  }

  getClientes(page: number, size: number, campo: string, orden: string) {
    this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get<ResponseBasePageModel>(
      this.urlEndPoint + `/page?page=${page}&size=${size}&sort=${campo},${orden}`, {headers: this.httpHeaders});
  }

  getTiposDocumentos() {
    this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get<ResponseBaseClientesTiposDocumentosModel>(
      this.urlEndPoint + `/tipos-documentos`, {headers: this.httpHeaders});
  }

  create(cliente: ClienteModel): Observable<ClienteModel> {
    // return this.http.post<Cliente>(this.urlEndPoint, cliente, {headers: this.agregarAuthorizarionHeader()}).pipe(
    return this.http.post<ClienteModel>(this.urlEndPoint, cliente).pipe(
      map((response: any) => response.cliente as ClienteModel),
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

  getCliente(id): Observable<ClienteModel> {
    // return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`, {headers: this.agregarAuthorizarionHeader()}).pipe(
    return this.http.get<ClienteModel>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if (e.status !== 401 && e.error.mensaje) {
          this.router.navigate(['/clientes']);
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  update(cliente: ClienteModel): Observable<any> {
    // return this.http.put<any>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.agregarAuthorizarionHeader()}).pipe(
    return this.http.put<any>(`${this.urlEndPoint}/${cliente.id}`, cliente).pipe(
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

  delete(id: number): Observable<ClienteModel> {
    // return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, {headers: this.agregarAuthorizarionHeader()}).pipe(
    return this.http.delete<ClienteModel>(`${this.urlEndPoint}/${id}`).pipe(
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
