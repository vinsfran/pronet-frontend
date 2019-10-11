import {Component, OnInit} from '@angular/core';
import swal from 'sweetalert2';
import {DeudasService} from '../../../../services/deudas.service';
import {Pantalla1Model} from '../pantalla1.model';
import {Pantalla1RequestModel} from '../pantalla1Request.model';
import {ServiciosService} from '../../../../services/servicios.service';
import {ServiciosModel} from '../../servicios/servicios.model';
import {ClientesService} from '../../../../services/clientes.service';

@Component({
  selector: 'app-prestamos-list',
  templateUrl: './pantalla1-list.component.html',
  styleUrls: ['./pantalla1-list.component.css']
})
export class Pantalla1ListComponent implements OnInit {

  titulo: string;
  lista: string[];
  deudas: Pantalla1Model[];
  servicios: ServiciosModel[];
  tiposDocumentos: string[];
  estado: string;
  numeroDocumento: string;
  tipoDocumento: string;
  servicio: string;
  pantalla1RequestModel: Pantalla1RequestModel;

  constructor(private deudasService: DeudasService,
              private serviciosService: ServiciosService,
              private clientesService: ClientesService) {
  }

  ngOnInit() {
    this.titulo = 'Lista de Deudas Pendientes';
    this.lista = ['Deudas', this.titulo];
    this.inicializarForm();
    this.getServicios();
    this.getTiposDocumentos();
    this.getDeudasPantalla1(this.estado, this.numeroDocumento, this.tipoDocumento, this.servicio);
  }

  getDeudasPantalla1(estado: string, numeroDocumento: string, tipoDocumento: string, servicio: string) {
    this.deudasService.getDeudasPantalla1(estado, numeroDocumento, tipoDocumento, servicio).subscribe(
      response => {
        this.deudas = response.deudas;
      },
      (errors) => {
        swal.fire('Ocurrió un error al listar las Deudas', errors.message, 'error');
      }
    );
  }

  getServicios() {
    this.serviciosService.getServicios2().subscribe(
      response => {
        this.servicios = response.servicios;
      },
      (errors) => {
        swal.fire('Ocurrió un error al listar los Servicios', errors.message, 'error');
      }
    );
  }

  getTiposDocumentos() {
    this.clientesService.getTiposDocumentos().subscribe(
      response => {
        this.tiposDocumentos = response.tipos_documentos;
      },
      (errors) => {
        swal.fire('Ocurrió un error al listar los Tipos de Documentos', errors.message, 'error');
      }
    );
  }

  consultar() {
    this.getDeudasPantalla1(this.estado, this.numeroDocumento, this.tipoDocumento, this.servicio);
  }

  changePage(event) {
    this.getDeudasPantalla1(this.estado, this.numeroDocumento, this.tipoDocumento, this.servicio);
  }

  procesarPago(pantalla1Model: Pantalla1Model): void {
    swal.fire({
      title: 'Está seguro?',
      text: `¿Seguro que desea procesar el pago de la Deuda Nro ${pantalla1Model.factura}?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, procesar!',
      cancelButtonText: 'No, cancelar!',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.pantalla1RequestModel = new Pantalla1RequestModel();
        this.pantalla1RequestModel.servicio_id = pantalla1Model.servicio_id;
        this.pantalla1RequestModel.factura = pantalla1Model.factura;
        this.deudasService.procesarPago(this.pantalla1RequestModel).subscribe(
          response => {
            this.inicializarForm();
            this.getDeudasPantalla1(this.estado, this.numeroDocumento, this.tipoDocumento, this.servicio);
            swal.fire(
              'Deuda Procesada!',
              `Deuda Nro ${pantalla1Model.factura} procesada con éxito.`,
              'success'
            );
          }
        );

      }
    });
  }

  private inicializarForm() {
    this.estado = 'PE';
    this.numeroDocumento = '';
    this.tipoDocumento = '';
    this.servicio = '';
  }
}
