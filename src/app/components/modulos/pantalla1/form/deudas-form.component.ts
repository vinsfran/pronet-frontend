import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import swal from 'sweetalert2';
import {DeudasModel} from '../deudas.model';
import {DeudasService} from '../../../../services/deudas.service';

@Component({
  selector: 'app-deudas-form',
  templateUrl: './deudas-form.component.html',
  styleUrls: ['./deudas-form.component.css']
})
export class DeudasFormComponent implements OnInit {
  titulo: string;
  lista: string[];
  public errores: string[];

  deudaModel: DeudasModel;

  constructor(private deudasService: DeudasService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.deudaModel = new DeudasModel();
    this.titulo = 'Crear Prestamo';
    this.cargarPrestamo();
    this.lista = ['Prestamos'];
    this.lista.push(this.titulo);
  }


  cargarPrestamo(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.titulo = 'Editar Prestamo Nro: ' + id;
        this.deudasService.getPrestamo(id)
          .subscribe((deudaModel) => {
            this.deudaModel = deudaModel;
          });
      }
    });
  }

  create(): void {
    // this.deudaModel.estado = true;
    console.log(JSON.stringify(this.deudaModel).toString());
    this.deudasService.create(this.deudaModel)
      .subscribe(deuda => {
          this.router.navigate(['/deudas']);
          swal.fire('Nuevo Prestamo', `El Prestamo: ${deuda.servicio_id} ha sido creado con exito`, 'success');
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Codigo del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );
  }

  update(): void {
    this.deudasService.update(this.deudaModel)
      .subscribe(json => {
          console.error(json);
          this.router.navigate(['/deudas']);
          swal.fire(json.mensaje, `Prestamo: ${json.deuda.nroPrestamo}`, 'success');
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Codigo del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );
  }

  back() {
    this.router.navigate(['/deudas']);
  }


  setEntidadFinancieraId($event) {
    console.log($event);

  }

  onChange(newValue) {
    console.log(newValue);
  }
}
