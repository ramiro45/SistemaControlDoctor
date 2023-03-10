import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PacientesService {

  URL = 'http://localhost/ApiGinecologia/';
  constructor( private http: HttpClient) { }

  //Crear paciente
  altaPaciente(pacientes:any){
    return this.http.post(`${this.URL}AltaPaciente.php`,JSON.stringify(pacientes));
  } 

  //Obtener pacientes
  getPaciente(){
    return this.http.get(`${this.URL}ObtenerPacientes.php`);
  }


  //Seleccionar paciente del boton editar
  seleccionarPaciente(idpaciente:number){
    return this.http.get(`${this.URL}SeleccionarPaciente.php?idpaciente=${idpaciente}`);
  }

  //Editar pacientes
  editarPaciente(pacientes:any){
    return this.http.post(`${this.URL}EditarPaciente.php`,JSON.stringify(pacientes));
  }

  //Eliminar pacientes
  eliminarPaciente(idpaciente: number){
    return this.http.get(`${this.URL}EliminarPaciente.php?idpaciente=${idpaciente}`);
  }

  //NuevoHistorial
  altaHistorial(newhistorial:any){
    return this.http.post(`${this.URL}NuevoHistorial.php`,JSON.stringify(newhistorial));
  } 

  //Obtener historiales
  getHistorial(){
    return this.http.get(`${this.URL}ObtenerHistoriales.php`);
  }

  //Obtener expedientes
  getExpedientes(idpaciente:number){
    return this.http.get(`${this.URL}ObtenerExpedientes.php?idpaciente=${idpaciente}`);
  }

  //Seleccionar Expediente
  seleccionarExpediente(idhistorial: number){
    return this.http.get(`${this.URL}SeleccionarExpediente.php?idhistorial=${idhistorial}`);
  }

  //Editar Expediente
  editarExpediente(expediente:any){
    return this.http.post(`${this.URL}EditarExpediente.php`,JSON.stringify(expediente));
  }

  //Imprimir Receta
  seleccionarRecetaPDF(idhistorial:number){
    window.open(`${this.URL}extensiones/tcpdf/pdf/rec.php?idhistorial=${idhistorial}`,'_blank');
  }

}
