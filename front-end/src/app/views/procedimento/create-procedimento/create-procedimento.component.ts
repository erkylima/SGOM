import { TipoServico } from './../../tiposervico/tiposervico.model';
import {ToastrService} from 'ngx-toastr';
import {FormGroup, Validators, FormControl} from '@angular/forms';
import {ProcedimentoService} from '../procedimento.service';
import {Procedimento} from '../procedimento.model';
import {Component, OnInit, Renderer2} from '@angular/core';

@Component({
    selector: 'app-create-procedimento',
    templateUrl: './create-procedimento.component.html',
    styleUrls: ['./create-procedimento.component.scss']
})
export class CreateProcedimentoComponent implements OnInit {
    id: string;
    procedimento: Procedimento;
    tiposervico: TipoServico;

    public criarProcedimentoForm: FormGroup;
    public isAuthLoading = false;

    constructor(
        private renderer: Renderer2,
        private toastr: ToastrService,
        private procedimentoService: ProcedimentoService
    ) {}

    ngOnInit(): void {
        this.tiposervico = new TipoServico(
            null,
            null,
            null
        );

        this.criarProcedimentoForm = new FormGroup({
            tiposervico: new FormControl(null),
            ordem: new FormControl(null, Validators.required),
            nome: new FormControl(null, Validators.required),
        });
    }

    save() {
        if (this.criarProcedimentoForm.valid) {
            this.isAuthLoading = true;
            this.tiposervico.id = this.criarProcedimentoForm.value.tiposervico;
            this.criarProcedimentoForm.value.tiposervico = this.tiposervico;
            this.procedimentoService.adicionarEditarProcedimento(this.criarProcedimentoForm.value);
            this.isAuthLoading = false;
        } else {
            this.toastr.error(
                'Algo deu errado!',
                'Por favor, tente novamente!'
            );
        }
    }
}
