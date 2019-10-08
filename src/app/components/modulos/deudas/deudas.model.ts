import {ClienteModel} from '../clientes/cliente.model';
import {ServiciosModel} from '../servicios/servicios.model';

export class DeudasModel {
  servicio_id: number;
  factura: string;
  importe: number;
  vencimiento: Date;
  estado: string;
  cliente: ClienteModel;
  servicio: ServiciosModel;
}
