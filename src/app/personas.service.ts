import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, URLSearchParams, Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class PersonasService {

  route : string = "http://localhost/index.php/";
  constructor(private http : Http) { }
  
  TraerPersonas() {
    return this.http.get(this.route + "persona/obtenerTodas") 
                .toPromise() 
                .then(this.ExtraerData) 
                .catch(this.GenerarError);
  }

  ExtraerData(res : Response) {
    return res.json() || {};
  }

  GenerarError(error : Response) {
    return error;
  }

  BorrarPersona(idContacto) {
    let datos = {"id" : idContacto};
    let headers = new Headers({ 'Content-Type' : 'application/json' });
    let options = new RequestOptions({
      headers: headers,
      body : datos
    });
    
    return this.http.delete(this.route + "persona/borrar", options)
             .toPromise()
             .then()
             .catch(this.GenerarError)
  }

  AgregarPersona(formData) {
    return this.http.post(this.route + "persona/agregar", formData)
             .toPromise()
             .then()
             .catch(this.GenerarError)
  }
}
