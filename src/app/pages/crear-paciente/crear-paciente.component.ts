import { Component } from '@angular/core';
import { PacientesService } from 'src/app/services/pacientes.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-paciente',
  templateUrl: './crear-paciente.component.html',
  styleUrls: ['./crear-paciente.component.css']
})
export class CrearPacienteComponent  {

  pacientes: any= {};

  constructor( private pacientesServices: PacientesService, private router: Router) { }
  
  AltaPaciente(){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: '¿Desea registrar el paciente?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '¡Aceptar!',
      cancelButtonText: '¡Cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.pacientesServices.altaPaciente(this.pacientes).subscribe( (resp: any)=>{
          if ( resp['resultado'] == 'OK') {
        swalWithBootstrapButtons.fire(
          'Registrado',
          '¡Paciente registrado!',
          'success'
        )
        this.router.navigate(['/nuevo-historial']);
          }
        }); 
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'Ups!',
          'error'
        )
      }
    })

  }



}
