import {Empresa} from './../../blank/empresa.model';
import {ToastrService} from 'ngx-toastr';
import {FormGroup, Validators, FormControl} from '@angular/forms';
import {CarroService} from '../carro.service';
import {Carro} from './../carro.model';
import {Component, OnInit, Renderer2} from '@angular/core';

@Component({
    selector: 'app-create-carro',
    templateUrl: './create-carro.component.html',
    styleUrls: ['./create-carro.component.scss']
})
export class CreateCarroComponent implements OnInit {
    id: string;
    carro: Carro;
    empresa: Empresa;

    public criarCarroForm: FormGroup;
    public isAuthLoading = false;

    constructor(
        private renderer: Renderer2,
        private toastr: ToastrService,
        private carroService: CarroService
    ) {}

    ngOnInit(): void {
        this.empresa = new Empresa(
            Number(localStorage.getItem('empresa_id')),
            null,
            null,
            null,
            null,
            null
        );

        this.criarCarroForm = new FormGroup({
            empresa: new FormControl(null),
            ano: new FormControl(null, Validators.required),
            modelo: new FormControl(null, Validators.required),
            placa: new FormControl(null, Validators.required),
            marca: new FormControl(null, Validators.required)
        });
    }

    save() {
        if (this.criarCarroForm.valid) {
            this.isAuthLoading = true;
            this.criarCarroForm.value.empresa = this.empresa;
            this.carroService.adicionarEditarCarro(this.criarCarroForm.value);
            this.isAuthLoading = false;
        } else {
            this.toastr.error(
                'Algo deu errado!',
                'Por favor, tente novamente!'
            );
        }
    }
}
