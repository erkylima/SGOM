import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {UsuarioService} from './usuario.service';
import {Component, OnInit, Renderer2} from '@angular/core';
import { Usuario } from '../profile/usuario.model';

@Component({
    selector: 'app-usuario',
    templateUrl: './usuario.component.html',
    styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {
    constructor(
        private router: Router,
        private renderer: Renderer2,
        private toastr: ToastrService,
        private usuarioService: UsuarioService
    ) {}

    usuarioList: Usuario;

    ngOnInit() {
        this.usuarioService
            .getUsuarios()
            .subscribe((res) => (this.usuarioList = res));
    }

    delete(id: string) {
        this.usuarioService.delete(id).subscribe(
            (data) => {
                this.toastr.error('Apagando tipo de serviço');
                this.router.navigate(['/']);
            },
            (error) => {
                this.toastr.error(
                    'Informações de acesso incorretas. Tente novamente'
                );
                // get the status as error.status
            }
        );
    }
}
