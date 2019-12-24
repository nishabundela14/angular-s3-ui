import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { LinkResolver } from './Api/link.service';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { SidebarComponent } from './sidebar/sidebar.component';


const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch:'full'},
  {path:'login', component: LoginComponent},
  {path:'home', component: AdminComponent, children:[
  {path:'', component:HomeComponent},
  {path: '', component:SidebarComponent, outlet:'sidebar'},
  {path:'about', component: AboutComponent},
  {path: 'about', component:SidebarComponent, outlet:'sidebar'},
  {path:'product-details/:name', component: AboutComponent, resolve: {items: LinkResolver}},
  ]},


  
  {path:'**', redirectTo:'home', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
