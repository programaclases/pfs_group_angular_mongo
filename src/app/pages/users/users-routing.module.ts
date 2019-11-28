import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserContentComponent } from './user-content/user-content.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserEditComponent } from './user-edit/user-edit.component';


const routes: Routes = [
  {path: 'list', component: UserListComponent},
  { path: 'create', component: UserCreateComponent},
  { path: 'edit/:id', component: UserEditComponent},
  { path: '', pathMatch: 'full', redirectTo: 'list'}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
