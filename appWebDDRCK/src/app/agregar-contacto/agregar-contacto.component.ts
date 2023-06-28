import { Component, OnInit } from '@angular/core';
import { ContactoService } from '../contacto.service';
import { Contacto } from '../modelos/contacto';
import {FormControl,FormGroup,Validators} from '@angular/forms';  
import { Direccion } from '../modelos/direccion';

@Component({
  selector: 'app-agregar-contacto',
  templateUrl: './agregar-contacto.component.html',
  styleUrls: ['./agregar-contacto.component.css']
})
export class AgregarContactoComponent implements OnInit {

 

  constructor(private contactoService:ContactoService) { }

  contacto:Contacto = new Contacto();
  direccion:Direccion = new Direccion();
  submitted = false; 



  ngOnInit(): void {
    this.submitted=false;  
  }

  contactoGuardarForm=new FormGroup({  
    nombre:new FormControl('' , [Validators.required ] ),  
    apellido_p:new FormControl('',[Validators.required]),  
    apellido_m:new FormControl('',[Validators.required]),  
    email:new FormControl('',[Validators.required, Validators.email]),
    telefono:new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")]),
    calle:new FormControl('',[Validators.required]),
    codigo_postal:new FormControl('',[Validators.required]),
    colonia:new FormControl('',[Validators.required]),
    numero:new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")])

  });  

  guardarContacto(guardarcontacto: any){  
    this.contacto=new Contacto();     
    this.contacto.nombre=this.Nombre.value;
    this.contacto.email=this.Email.value;
    this.contacto.apellidoP=this.Apellidop.value;  
    this.contacto.apellidoM=this.Apellidom.value;
    this.contacto.telefono=this.Telefono.value;
    this.direccion = new Direccion();
    this.direccion.calle=this.Calle.value;
    this.direccion.codigoPostal=this.CodigoPostal.value;
    this.direccion.colonia=this.Colonia.value;
    this.direccion.numero=Number(this.Numero.value);
    this.contacto.direccion=this.direccion;
    this.submitted = true;  
    this.guardar();  
  }  


  guardar() {  
      this.contactoService.guardar(this.contacto).subscribe(data =>{
        console.log(data);
      }, 
      error => {
        console.log(error); 
      }
    );
    this.contacto = new Contacto(); 
  }  


  get Nombre(){
    return this.contactoGuardarForm.get('nombre');    
  }

  get Email(){
    return this.contactoGuardarForm.get('email');   
  }

  get Apellidop(){
    return this.contactoGuardarForm.get('apellido_p');   
  }

  get Apellidom(){
    return this.contactoGuardarForm.get('apellido_m');   
  }

  get Telefono(){
    return this.contactoGuardarForm.get('telefono');   
  }

  get Calle(){
    return this.contactoGuardarForm.get('calle');   
  }

  get CodigoPostal(){
    return this.contactoGuardarForm.get('codigo_postal'); 
  }

  get Colonia(){
    return this.contactoGuardarForm.get('colonia'); 
  }

  get Numero(){
    return this.contactoGuardarForm.get('numero'); 
  }


  agregarContactoForm(){  
    this.submitted=false;  
    this.contactoGuardarForm.reset();  
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

}
