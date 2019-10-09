import {Component, OnInit} from '@angular/core';
import swal from 'sweetalert2';
import {TransaccionesModel} from '../transacciones.model';
import {PageModel} from '../../widgets/page.model';
import {TransaccionesService} from '../../../../services/transacciones.service';

@Component({
  selector: 'app-transacciones-list',
  templateUrl: './transacciones-list.component.html',
  styleUrls: ['./transacciones-list.component.css']
})
export class TransaccionesListComponent implements OnInit {

  titulo: string;
  lista: string[];
  transacciones: TransaccionesModel[];
  page: PageModel;
  campo: string;
  orden: string;

  constructor(private transaccionesService: TransaccionesService) {
  }

  ngOnInit() {
    this.titulo = 'Lista de Transacciones';
    this.lista = ['Transacciones', this.titulo];
    this.campo = 'id';
    this.orden = 'asc';
    this.getTransacciones(0, 10, this.campo, this.orden);
  }

  getTransacciones(page: number, size: number, campo: string, orden: string) {
    this.transaccionesService.getTransacciones(page, size, campo, orden).subscribe(
      response => {
        this.page = response.page;
        this.transacciones = this.page.content;
      },
      (errors) => {
        swal.fire('Ocurrió un error al listar las Transacciones', errors.transaccionsage, 'error');
      }
    );
  }

  changePage(event) {
    this.getTransacciones(event.page, event.size, this.campo, this.orden);
  }

  sortingPage(campo: string) {
    this.campo = campo;
    if (this.orden === 'asc') {
      this.orden = 'desc';
    } else {
      this.orden = 'asc';
    }
    this.getTransacciones(this.page.number, this.page.size, this.campo, this.orden);
  }

  setClasses(campo: string) {
    let classes = 'sorting_asc';
    if (this.campo === campo && this.orden === 'desc') {
      classes = 'sorting_desc';
    }
    return classes;
  }

  delete(transaccion: TransaccionesModel): void {
    swal.fire({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar la transacción ${transaccion.id}?`,
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

        this.transaccionesService.delete(transaccion.id).subscribe(
          response => {
            this.transacciones = this.transacciones.filter(cli => cli !== transaccion);
            swal.fire(
              'Transacción Eliminada!',
              `Transacción ${transaccion.id} eliminada con éxito.`,
              'success'
            );
          }
        );

      }
    });
  }
}
