import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Triagem} from './triagem.model';
import {TriagemService} from './triagem.service';
import {Component, OnInit, Renderer2} from '@angular/core';

@Component({
    selector: 'app-triagem',
    templateUrl: './triagem.component.html',
    styleUrls: ['./triagem.component.scss']
})
export class TriagemComponent implements OnInit {
    carro_id: string;
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private renderer: Renderer2,
        private toastr: ToastrService,
        private triagemService: TriagemService
    ) {}

    triagemList: Triagem;

    ngOnInit() {
        this.carro_id = this.route.snapshot.paramMap.get('carro');

        this.triagemService
            .getTriagems(this.carro_id)
            .subscribe((res) => (this.triagemList = res));
        }

    delete(id: string) {
        this.triagemService.delete(id).subscribe(
            (data) => {
                this.toastr.error('Apagando serviço');
                this.router.navigate(['/']);
            },
            (error) => {
                this.toastr.error(
                    'Informações de acesso incorretas. Tente novamente'
                );
                // get the status as error.status
            }
        );
    }
}
