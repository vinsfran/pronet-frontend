import {Component, OnInit} from '@angular/core';
import swal from 'sweetalert2';
import {Pantalla2Model} from '../pantalla2.model';
import {PageModel} from '../../widgets/page.model';
import {TransaccionesService} from '../../../../services/transacciones.service';

@Component({
  selector: 'app-pantalla2-list',
  templateUrl: './pantalla2-list.component.html',
  styleUrls: ['./pantalla2-list.component.css']
})
export class Pantalla2ListComponent implements OnInit {

  titulo: string;
  lista: string[];
  pantalla2Models: Pantalla2Model[];
  page: PageModel;
  campo: string;
  orden: string;
  fechaDesde: string;
  fechaHasta: string;

  constructor(private transaccionesService: TransaccionesService) {
  }

  ngOnInit() {
    this.titulo = 'Lista de Transacciones del dia';
    this.lista = ['Transacciones', this.titulo];
    this.campo = 'id';
    this.orden = 'asc';
    const d = new Date();
    this.fechaDesde = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + 1;
    this.fechaHasta = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
    this.getTransaccionesPantalla2(this.fechaDesde, this.fechaHasta, 0, 10, this.campo, this.orden);
  }

  consultarMovimiento() {
    this.getTransaccionesPantalla2(this.fechaDesde, this.fechaHasta, 0, 10, this.campo, this.orden);
  }

  getTransaccionesPantalla2(fechaDesde: string, fechaHasta: string, page: number, size: number, campo: string, orden: string) {
    this.transaccionesService.getTransaccionesPantalla2(fechaDesde, fechaHasta, page, size, campo, orden).subscribe(
      response => {
        console.log(response);
        this.page = response.page;
        this.pantalla2Models = this.page.content;
      },
      (errors) => {
        swal.fire('Ocurrió un error al listar las Transacciones', errors.transaccionsage, 'error');
      }
    );
  }

  changePage(event) {
    this.getTransaccionesPantalla2(this.fechaDesde, this.fechaHasta, event.page, event.size, this.campo, this.orden);
  }

  sortingPage(campo: string) {
    this.campo = campo;
    if (this.orden === 'asc') {
      this.orden = 'desc';
    } else {
      this.orden = 'asc';
    }
    this.getTransaccionesPantalla2(this.fechaDesde, this.fechaHasta, this.page.number, this.page.size, this.campo, this.orden);
  }

  setClasses(campo: string) {
    let classes = 'sorting_asc';
    if (this.campo === campo && this.orden === 'desc') {
      classes = 'sorting_desc';
    }
    return classes;
  }

}
