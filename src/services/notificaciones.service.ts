import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import { Configuracion } from '../keys/config';
import { NotificacionCorreo } from '../models';
const fetch = require('node-fetch');

@injectable({scope: BindingScope.TRANSIENT})
export class NotificacionesService {
  constructor(/* Add @inject to inject parameters */) {}

  /*
   * Add service methods here
   */

  EnviarCorreo(datos: NotificacionCorreo){
    //instalamos node fetch para typescript e @types/node-fetch
    let url = `${Configuracion.urlCorreo}?destino=${datos.destino}&asunto=${datos.asunto}&mensaje=${datos.mensaje}&hash=${Configuracion.hashNotificacion}`;
    fetch(url)
      .then((res: any) => {
        // return res.text() == 'OK';
        console.log(res.text())
      })

  }
}
