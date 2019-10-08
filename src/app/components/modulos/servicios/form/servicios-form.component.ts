import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import swal from 'sweetalert2';
import {ServiciosModel} from '../servicios.model';
import {ServiciosService} from '../../../../services/servicios.service';

@Component({
  selector: 'app-servicios-form',
  templateUrl: './servicios-form.component.html',
  styleUrls: ['./servicios-form.component.css']
})
export class ServiciosFormComponent implements OnInit {
  titulo: string;
  lista: string[];
  errores: string[];

  tiposConceptos: string[] = ['Ingreso', 'Egreso'];

  servicioModel: ServiciosModel;


  constructor(private serviciosService: ServiciosService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.servicioModel = new ServiciosModel();
    this.titulo = 'Crear Concepto';
    this.cargarConcepto();
    this.lista = ['Conceptos'];
    this.lista.push(this.titulo);
  }


  cargarConcepto(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.titulo = 'Editar Concepto Nro: ' + id;
        this.serviciosService.getServicio(id)
          .subscribe((servicioModel) => {
            this.servicioModel = servicioModel;
          });
      }
    });
  }

  create(): void {
    // this.servicioModel.usuarioId = this.authService.usuario.id;
    console.log(JSON.stringify(this.servicioModel).toString());
    this.serviciosService.create(this.servicioModel)
      .subscribe(servicio => {
          this.router.navigate(['/servicios']);
          swal.fire('Nuevo Concepto', `El Concepto: ${servicio.id} ha sido creado con exito`, 'success');
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Codigo del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );
  }

  update(): void {
    this.serviciosService.update(this.servicioModel)
      .subscribe(json => {
          console.error(json);
          this.router.navigate(['/servicios']);
          swal.fire(json.mensaje, `Concepto: ${json.servicio.nroConcepto}`, 'success');
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Codigo del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );
  }

  back() {
    this.router.navigate(['/servicios']);
  }
}
