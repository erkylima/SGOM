import {ToastrService} from 'ngx-toastr';
import {FormGroup, Validators, FormControl} from '@angular/forms';
import {TriagemService} from '../triagem.service';
import {Component, OnInit, Renderer2} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Triagem} from '../triagem.model';
import { Carro } from '../../carro/carro.model';
import { TipoServico } from '../../tiposervico/tiposervico.model';

@Component({
    selector: 'app-edit-triagem',
    templateUrl: './edit-triagem.component.html',
    styleUrls: ['./edit-triagem.component.scss']
})
export class EditTriagemComponent implements OnInit {
    public editTriagemForm: FormGroup;
    public isAuthLoading = false;
    id: string;
    carro_id:number;
    triagem: Triagem;

    constructor(
        private renderer: Renderer2,
        private toastr: ToastrService,
        private triagemService: TriagemService,
        private route: ActivatedRoute
    ) {}
    carro:Carro;
    tiposervico:TipoServico;

    ngOnInit(): void {
        this.id = this.route.snapshot.paramMap.get('id');
        this.carro_id = Number(this.route.snapshot.paramMap.get('carro'));

        this.triagemService.getTriagemFunction(this.id).subscribe((res) => {

            this.carro = new Carro(this.carro_id,null,null,null,null,null);
            this.tiposervico = new TipoServico(res.tipoServico.id,null,null);
            this.triagem = new Triagem(res.id, this.carro, this.tiposervico, res.preco);
        });
        this.editTriagemForm = new FormGroup({
            id: new FormControl(null),
            id_carro: new FormControl(null),
            id_tiposervico: new FormControl(null),
            preco: new FormControl(null, Validators.required),
        });
    }

    update() {
        if (this.editTriagemForm.valid) {
            this.isAuthLoading = true;
            this.editTriagemForm.value.id = this.id;            
            this.editTriagemForm.value.id_carro = this.carro_id;
            this.editTriagemForm.value.id_tiposervico = this.tiposervico.id;
            this.triagemService.update(this.editTriagemForm.value);
            this.isAuthLoading = false;
        } else {
            this.toastr.error(
                'Algo deu errado!',
                'Por favor, tente novamente!'
            );
        }
    }
}
