import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';  

@Injectable({
  providedIn: 'root'
})
export class ContactoService {
  private baseUrl='http://localhost:8080/contactos/';

  constructor(private http:HttpClient) { }

  consultarTodos():Observable<any>{
    return this.http.get(`${this.baseUrl}`+'consultarTodos');  
  }

  eliminar(idContacto: number): Observable<any> {  
    return this.http.delete(`${this.baseUrl}eliminar/${idContacto}`, { responseType: 'text' });  
  }

  guardar(contacto: object): Observable<object> {  
    return this.http.post(`${this.baseUrl}`+'guardar', contacto);  
  }

  actualizar(idContacto: number, contacto: object): Observable<Object> {  
    return this.http.put(`${this.baseUrl}`+'actualizar', contacto); 
  }
  
  consultarPorId(idContacto: number): Observable<any> {  
    return this.http.get(`${this.baseUrl}consultarPorId/${idContacto}`);  
  } 


}
