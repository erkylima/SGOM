import { EditProcedimentoComponent } from './views/procedimento/edit-procedimento/edit-procedimento.component';
import { ProcedimentoComponent } from './views/procedimento/procedimento.component';
import { EditTipoServicoComponent } from './views/tiposervico/edit-tiposervico/edit-tiposervico.component';
import { CreateTipoServicoComponent } from './views/tiposervico/create-tiposervico/create-tiposervico.component';
import { TipoServicoComponent } from './views/tiposervico/tiposervico.component';
import { EditCarroComponent } from './views/carro/edit-empresa/edit-carro.component';
import { CarroComponent } from './views/carro/carro.component';
import { EditEmpresaComponent } from './views/blank/edit-empresa/edit-empresa.component';
import { CreateEmpresaComponent } from './views/blank/create-empresa/create-empresa.component';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from './pages/main/main.component';
import {BlankComponent} from './views/blank/blank.component';
import {LoginComponent} from './pages/login/login.component';
import {ProfileComponent} from './views/profile/profile.component';
import {RegisterComponent} from './pages/register/register.component';
import {DashboardComponent} from './views/dashboard/dashboard.component';
import {AuthGuard} from './utils/guards/auth.guard';
import {NonAuthGuard} from './utils/guards/non-auth.guard';
import {ForgotPasswordComponent} from './pages/forgot-password/forgot-password.component';
import {RecoverPasswordComponent} from './pages/recover-password/recover-password.component';
import { CreateCarroComponent } from './views/carro/create-empresa/create-carro.component';
import { CreateProcedimentoComponent } from './views/procedimento/create-procedimento/create-procedimento.component';

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
            {
                path: 'profile',
                component: ProfileComponent
            },
            {
                path: 'empresa',
                component: BlankComponent
            },
            {
              path: 'empresa/criar',
              component: CreateEmpresaComponent
            },{
              path: 'empresa/edit/:id',
              component: EditEmpresaComponent
            },
            {
              path: 'carro',
              component: CarroComponent
            },
            {
              path: 'carro/criar',
              component: CreateCarroComponent
            },{
              path: 'carro/edit/:id',
              component: EditCarroComponent
            },
            {
              path: 'tiposervico',
              component: TipoServicoComponent
            },
            {
              path: 'tiposervico/criar',
              component: CreateTipoServicoComponent
            },{
              path: 'tiposervico/edit/:id',
              component: EditTipoServicoComponent
            },
            {
              path: 'procedimento',
              component: ProcedimentoComponent
            },
            {
              path: 'procedimento/criar',
              component: CreateProcedimentoComponent
            },{
              path: 'procedimento/edit/:id',
              component: EditProcedimentoComponent
            },

            {
                path: '',
                component: DashboardComponent
            }
        ]
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'recover-password',
        component: RecoverPasswordComponent,
        canActivate: [NonAuthGuard]
    },
    {path: '**', redirectTo: ''}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {relativeLinkResolution: 'legacy'})],
    exports: [RouterModule]
})
export class AppRoutingModule {}
