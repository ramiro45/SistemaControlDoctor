import { Component, OnInit } from '@angular/core';
import { Pacientes } from 'src/app/interfaces/pacientes.interface';
import { PacientesService } from 'src/app/services/pacientes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-datos-paciente',
  templateUrl: './datos-paciente.component.html',
  styleUrls: ['./datos-paciente.component.css']
})
export class DatosPacienteComponent implements OnInit {

  //Obtener la lista de paciente
  pacientes: any={};

  paciente: any={};

  p: number= 1;

  filtrarNombre: any= '';

  constructor(public pacienteService: PacientesService) { }

  ngOnInit(): void {
    this.obtenerPacientes();
  }

  obtenerPacientes(){
    this.pacienteService.getPaciente().subscribe(
      resp=>{
        this.pacientes= resp;
        //console.log(this.pacientes);
      }
    );
  }

  seleccionarPaciente(idpaciente:number){
    this.pacienteService.seleccionarPaciente(idpaciente).subscribe((resp:any)=>{
      this.paciente= resp[0];
      console.log(this.paciente);
    });
  }

  editarPaciente(){
    this.pacienteService.editarPaciente(this.paciente).subscribe(
      (resp:any)=>{
        if (resp['resultado']=='OK') {
          Swal.fire({
            icon: 'success',
            title: 'Paciente editado correctamente',
            showConfirmButton: false,
            timer: 2000
          })
          this.obtenerPacientes();
        }
      }
    )
  }

  EliminarPaciente(idpaciente:number){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: '¿Desea eliminar el paciente?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '¡Aceptar!',
      cancelButtonText: '¡Cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.pacienteService.eliminarPaciente(idpaciente).subscribe( (resp: any)=>{
          if ( resp['resultado'] == 'OK') {
        swalWithBootstrapButtons.fire(
          '¡Paciente eliminado!',
          'Haga click para continuar',
          'success'
        )
        this.obtenerPacientes();
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
