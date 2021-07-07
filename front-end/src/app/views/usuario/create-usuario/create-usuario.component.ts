import {ToastrService} from 'ngx-toastr';
import {FormGroup, Validators, FormControl} from '@angular/forms';
import {UsuarioService} from '../usuario.service';
import {Component, OnInit, Renderer2} from '@angular/core';

@Component({
    selector: 'app-create-usuario',
    templateUrl: './create-usuario.component.html',
    styleUrls: ['./create-usuario.component.scss']
})
export class CreateUsuarioComponent implements OnInit {
    public criarUsuarioForm: FormGroup;
    public isAuthLoading = false;
    empresa_id: number;
    authorities: string;

    role = localStorage.getItem('role');

    roleAdmin() {
        return this.role == 'ROLE_ADMIN';
    }
    roleUser() {
        return this.role == 'ROLE_USER';
    }
    roleOficina() {
        return this.role == 'ROLE_OFICINA';
    }
    constructor(
        private renderer: Renderer2,
        private toastr: ToastrService,
        private usuarioService: UsuarioService
    ) {}

    ngOnInit(): void {
        if (this.roleAdmin()) {
            this.empresa_id = 1;
            this.authorities = 'ROLE_ADMIN';
        } else {
            this.empresa_id = Number(localStorage.getItem('empresa_id'));
            this.authorities = 'ROLE_USER';
        }

        this.criarUsuarioForm = new FormGroup({
            empresa_id: new FormControl(null),
            nome: new FormControl(null, Validators.required),
            email: new FormControl(null, Validators.required),
            usuario: new FormControl(null, Validators.required),
            senha: new FormControl(null, Validators.required),
            authorities: new FormControl(null)
        });
    }

    save() {
        if (this.criarUsuarioForm.valid) {
            this.isAuthLoading = true;

            this.criarUsuarioForm.value.empresa_id = this.empresa_id;
            this.criarUsuarioForm.value.authorities = this.authorities;
            this.usuarioService.adicionarEditarUsuario(
                this.criarUsuarioForm.value
            );
            this.isAuthLoading = false;
        } else {
            this.toastr.error(
                'Algo deu errado!',
                'Por favor, tente novamente!'
            );
        }
    }
}
