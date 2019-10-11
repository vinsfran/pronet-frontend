import {Component, OnInit} from '@angular/core';
import swal from 'sweetalert2';
import {Pantalla3DataModel} from '../pantalla3Data.model';
import {PageModel} from '../../widgets/page.model';
import {TransaccionesService} from '../../../../services/transacciones.service';

@Component({
  selector: 'app-pantalla3-list',
  templateUrl: './pantalla3-list.component.html',
  styleUrls: ['./pantalla3-list.component.css']
})
export class Pantalla3ListComponent implements OnInit {

  titulo: string;
  lista: string[];
  pantalla3DataModel: Pantalla3DataModel;
  page: PageModel;
  fechaDesde: string;
  fechaHasta: string;

  constructor(private transaccionesService: TransaccionesService) {
  }

  ngOnInit() {
    this.pantalla3DataModel = new Pantalla3DataModel();
    this.titulo = 'Lista de Transacciones con Porcentaje';
    this.lista = ['Transacciones', this.titulo];
    const d = new Date();
    this.fechaDesde = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + 1;
    this.fechaHasta = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
    this.getTransaccionesPantalla3(this.fechaDesde, this.fechaHasta);
  }

  consultarMovimiento() {
    this.getTransaccionesPantalla3(this.fechaDesde, this.fechaHasta);
  }

  getTransaccionesPantalla3(fechaDesde: string, fechaHasta: string) {
    this.transaccionesService.getTransaccionesPantalla3(fechaDesde, fechaHasta).subscribe(
      response => {
        this.pantalla3DataModel = response.data;
        console.log(this.pantalla3DataModel);
      },
      (errors) => {
        swal.fire('Ocurrió un error al listar las Transacciones', errors.transaccionsage, 'error');
      }
    );
  }

  changePage(event) {
    this.getTransaccionesPantalla3(this.fechaDesde, this.fechaHasta);
  }

  setClasses(campo: string) {
    return 'sorting_asc';
  }

}
