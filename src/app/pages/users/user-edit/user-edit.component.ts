import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  public createForm: FormGroup;
  public create = false;
  public message = '';
  public errores = false;
  public id = '';

  constructor(
    private userService: UsersService,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.createForm = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.minLength(4)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('')
    
    });
    this.route.params.subscribe( resp =>{
      console.log('resp', resp);
      this.id = resp.id;
      this.userService.getUser(this.id).toPromise().then( (usuario: any) => {
        console.log('usuario', usuario);

        const user = usuario.usuario;
        this.createForm = new FormGroup({
          nombre: new FormControl(user.nombre, [Validators.required, Validators.minLength(4)]),
          email: new FormControl(user.email, [Validators.required, Validators.email]),
          password: new FormControl(user.password),
        });
      } ).catch( error => { console.log('error usuario', error);
      });
    });

  }

  onSubmit() {

    this.userService.updateUser(this.createForm.value, this.id).toPromise().then( (resp: any) => {
      console.log('respuesta', resp);
      this.create = true;
      this.errores = false;
      console.log('password', this.createForm.controls.password.value.lenght);


      setTimeout( () => {
        this.create = false;
      }, 4000 );
    }).catch( error => {
      console.log('error', error);
      this.errores = true;
      this.message = JSON.stringify(error.error.error.errors);
    });

  }

}
