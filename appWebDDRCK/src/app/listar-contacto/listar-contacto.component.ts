import { Component, OnDestroy, OnInit, ViewChild  } from '@angular/core';
import { ContactoService } from '../contacto.service';
import { Subject } from "rxjs";
import { Contacto } from '../modelos/contacto';
import { LenguajeTabla } from '../lenguaje-tabla';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Direccion } from '../modelos/direccion';
import { DataTableDirective } from 'angular-datatables';


@Component({
  selector: 'app-listar-contacto',
  templateUrl: './listar-contacto.component.html',
  styleUrls: ['./listar-contacto.component.css']
})
export class ListarContactoComponent implements OnInit, OnDestroy{


  constructor(private contactoService:ContactoService) { }

  @ViewChild(DataTableDirective, {static: false})

  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};  
  dtTrigger: Subject<any>= new Subject();  
  
  contactos = new Array<any>();
  contacto : Contacto=new Contacto();
  direccion: Direccion= new Direccion();  
  mensajeEliminar=false;  
  contactoEdit: Contacto = new Contacto;  
  esactualizado = false;
  mensajeResultado:string;

  idContacto:number;


  ngOnInit(): void {
    this.esactualizado=false;  
    this.dtOptions = {
      destroy: true,  
      pageLength: 6,  
      stateSave:true,  
      lengthMenu:[[6, 16, 20, -1], [6, 16, 20, "All"]],  
      processing: true,
      language: LenguajeTabla.espanol_datatables  
    };     
    this.contactoService.consultarTodos().subscribe(data =>{
      this.contactos=data.datos;
      this.dtTrigger.next(); 
    })   
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }

  setIdContactoElimimar(idContacto:number){
    this.idContacto=idContacto;
  }

  eliminar() {  
    this.contactoService.eliminar(this.idContacto).subscribe(data => {  
          this.mensajeEliminar=true;
          this.mensajeResultado=JSON.parse(data).mensaje;
          
          this.contactoService.consultarTodos().subscribe(data =>{  
            this.contactos=data.datos;
            this.rerender(); 
            })  
        },  
        error => {
          this.mensajeEliminar=true;
          this.mensajeResultado=JSON.parse(error.error).mensaje;
        }
    );
    this.idContacto=null;
    
  }
  
  editar(idContacto: number){
    this.contactoService.consultarPorId(idContacto).subscribe(data => {  
          this.contactoEdit=data.datos;
          this.contactoActualizarForm.setValue({idContacto: this.contactoEdit.idContacto, 
                                                nombre: this.contactoEdit.nombre,
                                               apellido_p: this.contactoEdit.apellidoP,
                                               apellido_m: this.contactoEdit.apellidoM,
                                               email:this.contactoEdit.email,
                                               telefono:this.contactoEdit.telefono,
                                               idDireccion:this.contactoEdit["direccionVo"].idDireccion,
                                               calle:this.contactoEdit["direccionVo"].calle,
                                               codigo_postal:this.contactoEdit["direccionVo"].codigoPostal,
                                               colonia:this.contactoEdit["direccionVo"].colonia,
                                               numero:this.contactoEdit["direccionVo"].numero.toString()
                                              });
                      
        },  
        error => console.log(error)); 
  }

  limpiarMensaje(){
    this.mensajeEliminar=false;
  }

  contactoActualizarForm=new FormGroup({  
    idContacto:new FormControl(),
    nombre:new FormControl('' , [Validators.required ] ),  
    apellido_p:new FormControl('',[Validators.required]),
    apellido_m:new FormControl('',[Validators.required]),
    email:new FormControl('',[Validators.required, Validators.email]),
    telefono:new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")]),
    idDireccion:new FormControl(),
    calle:new FormControl('',[Validators.required]),
    codigo_postal:new FormControl('',[Validators.required]),
    colonia:new FormControl('',[Validators.required]),
    numero:new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")])  
  }); 

  actualizarContacto(actualizarcontacto:any){  
   this.contacto.idContacto=this.IdContacto.value;
   this.contacto.nombre=this.Nombre.value;
   this.contacto.apellidoP=this.Apellidop.value;
   this.contacto.apellidoM=this.Apellidom.value;         
   this.contacto.telefono=this.Telefono.value;
   this.contacto.email=this.Email.value;
   this.direccion = new Direccion();
   this.direccion.idDireccion=this.IdDireccion.value;
   this.direccion.calle=this.Calle.value;
   this.direccion.codigoPostal=this.CodigoPostal.value;
   this.direccion.colonia=this.Colonia.value;
   this.direccion.numero=Number(this.Numero.value);
   this.contacto.direccion=this.direccion;
     
   this.contactoService.actualizar(this.contacto.idContacto,this.contacto).subscribe(data => {       
      this.esactualizado=true;  
      this.contactoService.consultarTodos().subscribe(data =>{
        this.contactos=data.datos;
        this.rerender(); 
      })   
    },  
    error => console.log(error)); 
  }
  
  cambiarActualizar(){  
    this.esactualizado=false;  
  }
  
  get IdContacto(){
    return this.contactoActualizarForm.get('idContacto');
  }

  get IdDireccion(){
    return this.contactoActualizarForm.get('idDireccion');
  }

  get Nombre(){
    return this.contactoActualizarForm.get('nombre');    
  }

  get Email(){
    return this.contactoActualizarForm.get('email');   
  }

  get Apellidop(){
    return this.contactoActualizarForm.get('apellido_p');   
  }

  get Apellidom(){
    return this.contactoActualizarForm.get('apellido_m');   
  }

  get Telefono(){
    return this.contactoActualizarForm.get('telefono');   
  }

  get Calle(){
    return this.contactoActualizarForm.get('calle');   
  }

  get CodigoPostal(){
    return this.contactoActualizarForm.get('codigo_postal'); 
  }

  get Colonia(){
    return this.contactoActualizarForm.get('colonia'); 
  }

  get Numero(){
    return this.contactoActualizarForm.get('numero'); 
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  

}
