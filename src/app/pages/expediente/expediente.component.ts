import { Component, OnInit } from '@angular/core';
import { PacientesService } from 'src/app/services/pacientes.service';
import { ActivatedRoute } from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-expediente',
  templateUrl: './expediente.component.html',
  styleUrls: ['./expediente.component.css']
})
export class ExpedienteComponent implements OnInit {

  exp: any= {};

  expedientes: any= {};

  expediente: any = {};

  mostrar= false;

  constructor(private pacienteService: PacientesService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params =>{
      this.expedientes= params['id'];
      console.log(this.expedientes);
    });
  }

  ngOnInit(): void {
    this.obtenerExpediente();
  }

  obtenerExpediente(){
    this.pacienteService.getExpedientes(this.expedientes).subscribe(
      (resp:any)=>{
        this.exp = resp;
        //console.log(this.exp);
      }
    );
  }

  seleccionarExpediente(idhistorial: number){
    this.pacienteService.seleccionarExpediente(idhistorial).subscribe((resp:any)=>{
      this.expediente= resp[0];
      console.log(this.expediente);
    });
  }

  editarExpediente(){
    this.pacienteService.editarExpediente(this.expediente).subscribe(
      (resp:any)=>{
        if (resp['resultado']=='OK') {
          Swal.fire({
            icon: 'success',
            title: 'Expediente editado correctamente',
            showConfirmButton: false,
            timer: 2000
          })
          this.obtenerExpediente();
        }else{
          Swal.fire({
            title:'Ocurrio un error'
          })
        }
      }
    )
  }

  seleccionarReceta(idhistorial:number){
    this.pacienteService.seleccionarRecetaPDF(idhistorial);
  }

}
