import {ToastrService} from 'ngx-toastr';
import {FormGroup, Validators, FormControl} from '@angular/forms';
import {UsuarioService} from '../usuario.service';
import {Component, OnInit, Renderer2} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Usuario} from '../../profile/usuario.model';
import {Empresa} from '../../blank/empresa.model';

@Component({
    selector: 'app-edit-usuario',
    templateUrl: './edit-usuario.component.html',
    styleUrls: ['./edit-usuario.component.scss']
})
export class EditUsuarioComponent implements OnInit {
    public editUsuarioForm: FormGroup;
    public isAuthLoading = false;
    id: string;
    empresa: Empresa;
    usuario: Usuario;
    authorities: [{authority}];

    constructor(
        private renderer: Renderer2,
        private toastr: ToastrService,
        private usuarioService: UsuarioService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.id = this.route.snapshot.paramMap.get('id');

        this.usuarioService.getUsuarioFunction(this.id).subscribe((res) => {
            this.empresa = new Empresa(
                res.empresa.id,
                res.nome,
                res.empresa['cnpj'],
                res.username,
                res.email,
                res.password
            );

            this.usuario = new Usuario(
                Number(this.id),
                this.empresa,
                res.nome,
                res.username,
                res.email,
                res.password,
                null
            );
        });
        this.editUsuarioForm = new FormGroup({
            id: new FormControl(null),
            empresa_id: new FormControl(null),
            nome: new FormControl(null, Validators.required),
            email: new FormControl(null, Validators.required),
            usuario: new FormControl(null, Validators.required),
            senha: new FormControl(null),
            authorities: new FormControl(null)
        });
    }

    update() {
        if (this.editUsuarioForm.valid) {
            this.isAuthLoading = true;
            this.editUsuarioForm.value.id = this.id;
            this.usuarioService.update(this.editUsuarioForm.value);
            this.isAuthLoading = false;
        } else {
            this.toastr.error(
                'Algo deu errado!',
                'Por favor, tente novamente!'
            );
        }
    }
}
