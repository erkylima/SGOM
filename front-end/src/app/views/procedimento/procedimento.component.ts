import { ActivatedRoute, Router } from '@angular/router';
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
    tiposervico_id:string;
    constructor(
        private router: Router,
        private renderer: Renderer2,
        private toastr: ToastrService,
        private procedimentoService: ProcedimentoService,
        private route: ActivatedRoute,

        ) {}

    procedimentoList: Procedimento;
    
    role = localStorage.getItem('role');

    backClicked() {
        
      }
    
    roleAdmin() {
        return this.role == 'ROLE_ADMIN';
    }

    ngOnInit() {
        this.tiposervico_id = this.route.snapshot.paramMap.get('tiposervico');

        this.procedimentoService.getProcedimentos(this.tiposervico_id).subscribe((res) => {
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
