import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public url = 'http://localhost:3000/usuarios/';
  constructor( private http: HttpClient) { }

/* headers.append('Content-Type', 'application/json');
headers.append('Content-Type', 'multipart/form-data' ); */

  listar(): Observable<any> {
   return this.http.get(this.url + 'listar').pipe( map( (resp: any) => {
      console.log(resp);
      return resp.listaUsuarios;
    } ));
  }
  login( userForm ) {

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const body = {
      user: userForm,
    };

    return this.http.post(this.url + 'login', body , { headers }).pipe( map( resp => resp));
  }

  /* ping(): Observable<any> {
    return this.http.get('http://localhost:3000/ping' ).pipe( map( resp => {
       console.log(resp);
       return resp;
     } ));
   } */

   createUser( usuario) {

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    const body = {
      user: usuario
    };

    return this.http.post(this.url + 'crear', body, { headers } );

   }

   getUser(id) {
    return this.http.get( this.url + 'usuario?id=' + id ).pipe( map( resp => {
      return resp;
    }));
   }
  updateUser( value, id ): Observable<any> {
    // tslint:disable-next-line: prefer-const
    let headers = new HttpHeaders();
    const user = {
      user: value
    };
    headers.append('Content-Type', 'application/json');

    return this.http.put(this.url + 'update?id=' + id, user , { headers }).pipe( map (resp => resp ));
  }



   deleteUser( id ) {

    return this.http.delete( this.url + 'borrar?id=' + id ).pipe( map( resp => {
      return resp;
    }));
   }
}
