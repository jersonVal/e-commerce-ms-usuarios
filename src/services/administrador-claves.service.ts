import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import GeneratePassword from 'generate-password';
var CryptoJS = require("crypto-js");

@injectable({scope: BindingScope.TRANSIENT})
export class AdministradorClavesService {
  constructor(/* Add @inject to inject parameters */) {}

  /*
   * Add service methods here
   */

  CrearClaveAleatoria(){
    let password = GeneratePassword.generate({
      length: 10,
      numbers: true,
      uppercase: true
    })

    return password;
  }

  CifrarTexto(text: string){
    let textoCifrado = CryptoJS.MD5(text).toString();
    return textoCifrado;
  }
}
