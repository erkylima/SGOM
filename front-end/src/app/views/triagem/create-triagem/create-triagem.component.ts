import {ToastrService} from 'ngx-toastr';
import {FormGroup, Validators, FormControl} from '@angular/forms';
import {TriagemService} from '../triagem.service';
import {Triagem} from '../triagem.model';
import {Component, OnInit, Renderer2} from '@angular/core';

@Component({
    selector: 'app-create-tiposervico',
    templateUrl: './create-tiposervico.component.html',
    styleUrls: ['./create-tiposervico.component.scss']
})
export class CreateTriagemComponent implements OnInit {
    public criarTriagemForm: FormGroup;
    public isAuthLoading = false;

    constructor(
        private renderer: Renderer2,
        private toastr: ToastrService,
        private tiposervicoService: TriagemService
    ) {}

    ngOnInit(): void {
        this.criarTriagemForm = new FormGroup({
            nome: new FormControl(null, Validators.required),
            descricao: new FormControl(null, Validators.required)
        });
    }

    save() {
        if (this.criarTriagemForm.valid) {
            this.isAuthLoading = true;
            this.tiposervicoService.adicionarEditarTriagem(
                this.criarTriagemForm.value
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
