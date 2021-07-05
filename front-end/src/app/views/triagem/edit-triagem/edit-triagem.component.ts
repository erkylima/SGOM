import {ToastrService} from 'ngx-toastr';
import {FormGroup, Validators, FormControl} from '@angular/forms';
import {TriagemService} from '../triagem.service';
import {Component, OnInit, Renderer2} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Triagem} from '../triagem.model';

@Component({
    selector: 'app-edit-triagem',
    templateUrl: './edit-triagem.component.html',
    styleUrls: ['./edit-triagem.component.scss']
})
export class EditTriagemComponent implements OnInit {
    public editTriagemForm: FormGroup;
    public isAuthLoading = false;
    id: string;
    triagem: Triagem;

    constructor(
        private renderer: Renderer2,
        private toastr: ToastrService,
        private triagemService: TriagemService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.id = this.route.snapshot.paramMap.get('id');

        this.triagemService.getTriagemFunction(this.id).subscribe((res) => {
            this.triagem = new Triagem(res.id, res.nome, res['descricao']);
        });
        this.editTriagemForm = new FormGroup({
            id: new FormControl(null),
            nome: new FormControl(null, Validators.required),
            descricao: new FormControl(null, Validators.required)
        });
    }

    update() {
        if (this.editTriagemForm.valid) {
            this.isAuthLoading = true;
            this.editTriagemForm.value.id = this.id;
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
