import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import swal from 'sweetalert2';
import {TransaccionesModel} from '../transacciones.model';
import {TransaccionesService} from '../../../../services/transacciones.service';

@Component({
  selector: 'app-transacciones-form',
  templateUrl: './transacciones-form.component.html',
  styleUrls: ['./transacciones-form.component.css']
})
export class TransaccionesFormComponent implements OnInit {
  titulo: string;
  lista: string[];
  public errores: string[];

  // name = '';

  transaccionModel: TransaccionesModel;

  constructor(private transaccionesService: TransaccionesService,
              private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.transaccionModel = new TransaccionesModel();
    this.titulo = 'Crear Mes';
    this.cargarMes();
    this.lista = ['Meses'];
    this.lista.push(this.titulo);
  }


  cargarMes(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.titulo = 'Editar Mes Nro: ' + id;
        this.transaccionesService.get(id).subscribe((transaccionModel) => this.transaccionModel = transaccionModel);
      }
    });
  }

  create(): void {
    this.transaccionesService.create(this.transaccionModel)
      .subscribe(transaccion => {
          this.router.navigate(['/transacciones']);
          swal.fire('Nuevo transaccion', `La transacción: ${transaccion.id} ha sido creado con exito`, 'success');
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Codigo del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );
  }

  update(): void {
    this.transaccionesService.update(this.transaccionModel)
      .subscribe(json => {
          console.error(json);
          this.router.navigate(['/transacciones']);
          swal.fire(json.mensaje, `Mes: ${json.transaccion.nombre}`, 'success');
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Codigo del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );
  }

  back() {
    this.router.navigate(['/transacciones']);
  }

}
