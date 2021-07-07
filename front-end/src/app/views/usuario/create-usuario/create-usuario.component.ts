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

    constructor(
        private renderer: Renderer2,
        private toastr: ToastrService,
        private usuarioService: UsuarioService
    ) {}

    ngOnInit(): void {
        this.criarUsuarioForm = new FormGroup({
            nome: new FormControl(null, Validators.required),
            email: new FormControl(null, Validators.required),
            usuario: new FormControl(null, Validators.required),
            senha: new FormControl(null, Validators.required),
        });
    }

    save() {
        if (this.criarUsuarioForm.valid) {
            this.isAuthLoading = true;
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
