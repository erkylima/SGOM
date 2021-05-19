import { Router } from '@angular/router';
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
        private router: Router,
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

    delete(id:string){
      this.procedimentoService.delete(id).subscribe(
        (data) => {
          this.toastr.error("Apagando procedimento");
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
