import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import swal from 'sweetalert2';
import {DeudasService} from '../../../../services/deudas.service';
import {DeudasModel} from '../deudas.model';
import {PageModel} from '../../widgets/page.model';

@Component({
  selector: 'app-prestamos-list',
  templateUrl: './deudas-list.component.html',
  styleUrls: ['./deudas-list.component.css']
})
export class DeudasListComponent implements OnInit {

  titulo: string;
  lista: string[];
  deudas: DeudasModel[];
  page: PageModel;
  campo: string;
  orden: string;

  inputDeBuscar: string;

  constructor(private deudasService: DeudasService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.titulo = 'Lista de Deudas';
    this.lista = ['Deudas', this.titulo];
    this.campo = 'vencimiento';
    this.orden = 'asc';
    this.getDeudas(0, 10, this.campo, this.orden);
  }

  getDeudas(page: number, size: number, campo: string, orden: string) {
    this.deudasService.getDeudas(page, size, campo, orden).subscribe(
      response => {
        this.page = response.page;
        this.deudas = this.page.content;
      },
      (errors) => {
        swal.fire('Ocurrió un error al listar las Deudas', errors.message, 'error');
      }
    );
  }

  changePage(event) {
    this.getDeudas(event.page, event.size, this.campo, this.orden);
  }

  sortingPage(campo: string) {
    this.campo = campo;
    if (this.orden === 'asc') {
      this.orden = 'desc';
    } else {
      this.orden = 'asc';
    }
    this.getDeudas(this.page.number, this.page.size, this.campo, this.orden);
  }

  setClasses(campo: string) {
    let classes = 'sorting_asc';
    if (this.campo === campo && this.orden === 'desc') {
      classes = 'sorting_desc';
    }
    return classes;
  }

  delete(deudasModel: DeudasModel): void {
    swal.fire({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar la Deuda Nro ${deudasModel.servicio_id} ${deudasModel.factura}?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.deudasService.delete(deudasModel.servicio_id).subscribe(
          response => {
            this.deudas = this.deudas.filter(ro => ro !== deudasModel);
            swal.fire(
              'Deuda Eliminada!',
              `Deuda Nro ${deudasModel.servicio_id} ${deudasModel.factura} eliminada con éxito.`,
              'success'
            );
          }
        );

      }
    });
  }

  pagar(prestamoModel: DeudasModel) {
    this.router.navigateByData({
      url: ['/deudas/pagar'],
      data: [prestamoModel]
    });
  }

  buscar() {
    console.log('Valor en inputDeBuscar: ' + this.inputDeBuscar);
  }
}
