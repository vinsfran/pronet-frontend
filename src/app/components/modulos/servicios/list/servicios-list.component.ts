import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import swal from 'sweetalert2';
import {ServiciosService} from '../../../../services/servicios.service';
import {ServiciosModel} from '../servicios.model';
import {PageModel} from '../../widgets/page.model';

@Component({
  selector: 'app-servicios-list',
  templateUrl: './servicios-list.component.html',
  styleUrls: ['./servicios-list.component.css']
})
export class ServiciosListComponent implements OnInit {

  titulo: string;
  lista: string[];
  servicios: ServiciosModel[];
  page: PageModel;
  campo: string;
  orden: string;

  inputDeBuscar: string;

  constructor(private serviciosService: ServiciosService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {

  }

  ngOnInit() {
    this.titulo = 'Lista de Servicios';
    this.lista = ['Servicios', this.titulo];
    this.campo = 'id';
    this.orden = 'asc';
    this.getServicios(0, 10, this.campo, this.orden);
  }

  getServicios(page: number, size: number, campo: string, orden: string) {
    this.serviciosService.getServicios(page, size, campo, orden).subscribe(
      response => {
        this.page = response.page;
        this.servicios = this.page.content;
      },
      (errors) => {
        swal.fire('Ocurrió un error al listar los Servicios', errors.message, 'error');
      }
    );
  }

  changePage(event) {
    this.getServicios(event.page, event.size, this.campo, this.orden);
  }

  sortingPage(campo: string) {
    this.campo = campo;
    if (this.orden === 'asc') {
      this.orden = 'desc';
    } else {
      this.orden = 'asc';
    }
    this.getServicios(this.page.number, this.page.size, this.campo, this.orden);
  }

  setClasses(campo: string) {
    let classes = 'sorting_asc';
    if (this.campo === campo && this.orden === 'desc') {
      classes = 'sorting_desc';
    }
    return classes;
  }

  delete(servicio: ServiciosModel): void {
    swal.fire({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar el Servicio Nro ${servicio.id}?`,
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
        this.serviciosService.delete(servicio.id).subscribe(
          response => {
            this.servicios = this.servicios.filter(ro => ro !== servicio);
            swal.fire(
              'Servicio Eliminado!',
              `Servicio Nro ${servicio.id} eliminado con éxito.`,
              'success'
            );
          }
        );

      }
    });
  }

  pagar(servicioModel: ServiciosModel) {
    this.router.navigateByData({
      url: ['/servicios/pagar'],
      data: [servicioModel]
    });
  }

  buscar() {
    console.log('Valor en inputDeBuscar: ' + this.inputDeBuscar);
  }
}
