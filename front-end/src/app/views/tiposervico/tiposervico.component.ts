import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TipoServico } from './tiposervico.model';
import { TipoServicoService } from './tiposervico.service';
import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
    selector: 'app-tiposervico',
    templateUrl: './tiposervico.component.html',
    styleUrls: ['./tiposervico.component.scss']
})
export class TipoServicoComponent implements OnInit {
    constructor(private router:Router,private renderer: Renderer2, private toastr: ToastrService,
      private tiposervicoService:TipoServicoService) {}

    tiposervicoList:TipoServico;

    ngOnInit() {
      this.tiposervicoService.getTipoServicos().subscribe(res => this.tiposervicoList=res);
    }

    delete(id:string){
      this.tiposervicoService.delete(id).subscribe(
        (data) => {
          this.toastr.error("Apagando tipo de serviço");
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
