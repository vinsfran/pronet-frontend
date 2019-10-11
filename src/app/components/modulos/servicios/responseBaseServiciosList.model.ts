import {ResponseBaseModel} from '../widgets/responseBase.model';
import {ServiciosModel} from './servicios.model';


export class ResponseBaseServiciosListModel extends ResponseBaseModel {
  servicios: ServiciosModel[];
}
