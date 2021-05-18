import {ToastrService} from 'ngx-toastr';
import {Procedimento} from './procedimento.model';
import {ProcedimentoService} from './procedimento.service';
import {Component, OnInit, Renderer2} from '@angular/core';

@Component({
    selector: 'app-procedimento',
    templateUrl: './procedimento.component.html',
    styleUrls: ['./procedimento.component.scss']
})
export class ProcedimentoComponent implements OnInit {
    constructor(
        private renderer: Renderer2,
        private toastr: ToastrService,
        private procedimentoService: ProcedimentoService
    ) {}

    procedimentoList: Procedimento;

    ngOnInit() {
        this.procedimentoService.getProcedimentos().subscribe((res) => {
            this.procedimentoList = res;
            console.log(res);
        });
    }
}
