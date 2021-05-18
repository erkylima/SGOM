import { TipoServicoService } from './../../tiposervico/tiposervico.service';
import { TipoServico } from './../../tiposervico/tiposervico.model';
import {Procedimento} from '../procedimento.model';
import {ToastrService} from 'ngx-toastr';
import {FormGroup, Validators, FormControl} from '@angular/forms';
import {ProcedimentoService} from '../procedimento.service';
import {Component, OnInit, Renderer2} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-edit-procedimento',
    templateUrl: './edit-procedimento.component.html',
    styleUrls: ['./edit-procedimento.component.scss']
})
export class EditProcedimentoComponent implements OnInit {
    public editProcedimentoForm: FormGroup;
    public isAuthLoading = false;
    id: string;
    procedimento: Procedimento;
    tiposervico: TipoServico;

    constructor(
        private renderer: Renderer2,
        private toastr: ToastrService,
        private procedimentoService: ProcedimentoService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.id = this.route.snapshot.paramMap.get('id');


        this.procedimentoService.getProcedimentoFunction(this.id).subscribe((res) => {
            this.tiposervico = new TipoServico(
                res.tiposervico.id,
                res.tiposervico.nome,
                res.tiposervico.descricao
            );

            this.procedimento = new Procedimento(
                res.id,
                res.tiposervico,
                res.ordem,
                res.nome,
            );
        });
        this.editProcedimentoForm = new FormGroup({
            id: new FormControl(null),
            tiposervico: new FormControl(null),
            ordem: new FormControl(null, Validators.required),
            nome: new FormControl(null, Validators.required),

        });
    }

    update() {
        if (this.editProcedimentoForm.valid) {
            this.isAuthLoading = true;
            this.editProcedimentoForm.value.id = this.id;
            this.editProcedimentoForm.value.tiposervico = this.tiposervico;
            this.procedimentoService.update(this.editProcedimentoForm.value);
            this.isAuthLoading = false;
        } else {
            this.toastr.error(
                'Algo deu errado!',
                'Por favor, tente novamente!'
            );
        }
    }
}
