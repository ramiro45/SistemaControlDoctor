import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PacientesService } from 'src/app/services/pacientes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevo-historial',
  templateUrl: './nuevo-historial.component.html',
  styleUrls: ['./nuevo-historial.component.css']
})
export class NuevoHistorialComponent implements OnInit {

  mostrar= false;
  pacientes: any = {};

  fecha = new Date().getDate() + '-'+(new Date().getMonth()+1)+ '-'+(new Date().getFullYear());
  
  newhistorial: any= {
    fechahistorial:this.fecha
  };

  constructor(private pacienteService: PacientesService, private route:Router) { 
    console.log(this.fecha);
  }

  ngOnInit(): void {
    this.obtenerPacientes();
  }

  obtenerPacientes(){
    this.pacienteService.getPaciente().subscribe( resp=>{
      this.pacientes= resp;
    });
  }

  AltaHistorial(){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: '¿Desea registrar el nuevo historial?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '¡Aceptar!',
      cancelButtonText: '¡Cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.pacienteService.altaHistorial(this.newhistorial).subscribe( (resp: any)=>{
          if ( resp['resultado'] == 'OK') {
            swalWithBootstrapButtons.fire(
              'Registrado',
              '¡Se registro exitosamente!',
              'success'
            )
            }
          }
        ); 
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

  VerExp(idpaciente:number){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: '¿Desea ver el expediente?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '¡Aceptar!',
      cancelButtonText: '¡Cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.route.navigate(['/expediente',idpaciente]);
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
