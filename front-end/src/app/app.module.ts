import { EditProcedimentoComponent } from './views/procedimento/edit-procedimento/edit-procedimento.component';
import { ProcedimentoComponent } from './views/procedimento/procedimento.component';
import { EditTipoServicoComponent } from './views/tiposervico/edit-tiposervico/edit-tiposervico.component';
import { CreateTipoServicoComponent } from './views/tiposervico/create-tiposervico/create-tiposervico.component';
import { TipoServicoComponent } from './views/tiposervico/tiposervico.component';
import { CarroComponent } from './views/carro/carro.component';
import { EditCarroComponent } from './views/carro/edit-empresa/edit-carro.component';
import { EditEmpresaComponent } from './views/blank/edit-empresa/edit-empresa.component';
import { CreateEmpresaComponent } from './views/blank/create-empresa/create-empresa.component';
import {BrowserModule, Title} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MainComponent} from './pages/main/main.component';
import {LoginComponent} from './pages/login/login.component';
import {HeaderComponent} from './pages/main/header/header.component';
import {FooterComponent} from './pages/main/footer/footer.component';
import {MenuSidebarComponent} from './pages/main/menu-sidebar/menu-sidebar.component';
import {BlankComponent} from './views/blank/blank.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ProfileComponent} from './views/profile/profile.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RegisterComponent} from './pages/register/register.component';
import {DashboardComponent} from './views/dashboard/dashboard.component';
import {ToastrModule} from 'ngx-toastr';
import {MessagesDropdownMenuComponent} from './pages/main/header/messages-dropdown-menu/messages-dropdown-menu.component';
import {NotificationsDropdownMenuComponent} from './pages/main/header/notifications-dropdown-menu/notifications-dropdown-menu.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AppButtonComponent} from './components/app-button/app-button.component';

import {registerLocaleData} from '@angular/common';
import localeEn from '@angular/common/locales/en';
import {UserDropdownMenuComponent} from './pages/main/header/user-dropdown-menu/user-dropdown-menu.component';
import {ForgotPasswordComponent} from './pages/forgot-password/forgot-password.component';
import {RecoverPasswordComponent} from './pages/recover-password/recover-password.component';
import {LanguageDropdownComponent} from './pages/main/header/language-dropdown/language-dropdown.component';
import { CreateCarroComponent } from './views/carro/create-empresa/create-carro.component';
import { CreateProcedimentoComponent } from './views/procedimento/create-procedimento/create-procedimento.component';
import { CreateTriagemComponent } from './views/triagem/create-triagem/create-triagem.component';
import { EditTriagemComponent } from './views/triagem/edit-triagem/edit-triagem.component';
import { TriagemComponent } from './views/triagem/triagem.component';

registerLocaleData(localeEn, 'pt-BR');

@NgModule({
    declarations: [
        AppComponent,
        MainComponent,
        LoginComponent,
        HeaderComponent,
        FooterComponent,
        MenuSidebarComponent,
        BlankComponent,
        ProfileComponent,
        RegisterComponent,
        DashboardComponent,
        MessagesDropdownMenuComponent,
        NotificationsDropdownMenuComponent,
        AppButtonComponent,
        UserDropdownMenuComponent,
        ForgotPasswordComponent,
        RecoverPasswordComponent,
        LanguageDropdownComponent,
        CreateEmpresaComponent,
        EditEmpresaComponent,
        EditCarroComponent,
        CreateCarroComponent,
        CarroComponent,
        TipoServicoComponent,
        CreateTipoServicoComponent,
        EditTipoServicoComponent,
        ProcedimentoComponent,
        CreateProcedimentoComponent,
        EditProcedimentoComponent,
        CreateTriagemComponent,
        EditTriagemComponent,
        TriagemComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot({
            timeOut: 3000,
            positionClass: 'toast-bottom-right',
            preventDuplicates: true
        }),
        NgbModule
    ],
    providers: [
      Title
    ],    bootstrap: [AppComponent]
})
export class AppModule {}
