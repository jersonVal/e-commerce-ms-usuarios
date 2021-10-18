import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import { repository } from '@loopback/repository';
import GeneratePassword from 'generate-password';
import { CambioClave, Usuario } from '../models';
import { UsuarioRepository } from '../repositories';
var CryptoJS = require("crypto-js");

@injectable({scope: BindingScope.TRANSIENT})
export class AdministradorClavesService {
  constructor(@repository(UsuarioRepository)
  public usuarioRepository: UsuarioRepository) 
  {}

  /*
   * Add service methods here
   */


  async RecuperClave(correo: string): Promise<Usuario | null>{
    let usuario = await this.usuarioRepository.findOne({
      where:{
        correo: correo,
      }
    })

    if(usuario){
      //se actualizan los datos en la base de datos
      let clave = this.CrearClaveAleatoria();
      usuario.clave = this.CifrarTexto(clave);
      await this.usuarioRepository.updateById(usuario._id, usuario)
      //si todo sale bien se debe notificar el cambio de contraseña 
      return usuario;
    }else{
      return null;
    }    
  }

  async CambiarClave(credencialesClave: CambioClave): Promise<Usuario | null>{
    let usuario = await this.usuarioRepository.findOne({
      where:{
        _id: credencialesClave.id_usuario,
        clave: credencialesClave.clave_actual
      }
    })
    if(usuario){
      //se actualizan los datos en la base de datos
      usuario.clave = credencialesClave.nueva_clave
      await this.usuarioRepository.updateById(credencialesClave.id_usuario, usuario)
      return usuario;
    }else{
      return null;
    }
  }

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
