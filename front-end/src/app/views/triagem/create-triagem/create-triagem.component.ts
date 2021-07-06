import { ToastrService } from 'ngx-toastr';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { TriagemService } from '../triagem.service';
import { Triagem } from '../triagem.model';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TipoServico } from '../../tiposervico/tiposervico.model';
import { TipoServicoService } from '../../tiposervico/tiposervico.service';

@Component({
    selector: 'app-create-triagem',
    templateUrl: './create-triagem.component.html',
    styleUrls: ['./create-triagem.component.scss']
})
export class CreateTriagemComponent implements OnInit {

    public criarTriagemForm: FormGroup;
    public isAuthLoading = false;
    carro_id: string;

    tiposervicoList: TipoServico;

    constructor(
        private route: ActivatedRoute,
        private renderer: Renderer2,
        private toastr: ToastrService,
        private triagemService: TriagemService,
        private tiposervicoService: TipoServicoService
    ) { }

    ngOnInit(): void {
        this.carro_id = this.route.snapshot.paramMap.get('carro');
        this.tiposervicoService.getTipoServicos().subscribe(res => this.tiposervicoList = res);

        this.criarTriagemForm = new FormGroup({
            id: new FormControl(null),
            id_carro: new FormControl(null),
            id_tiposervico: new FormControl(null, Validators.required),
            preco: new FormControl(null, Validators.required),
        });
    }

    save() {

        if (this.criarTriagemForm.valid) {
            this.criarTriagemForm.value.id = "";
            this.criarTriagemForm.value.id_carro = this.carro_id;
            this.isAuthLoading = true;
            this.triagemService.adicionarEditarTriagem(
                this.criarTriagemForm.value
            );
            this.isAuthLoading = false;
        } else {
            this.toastr.error(
                'Algo deu errado!',
                'Por favor, tente novamente!'
            );
        }
        console.log(this.criarTriagemForm.value);

    }
}
