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
    constructor(private renderer: Renderer2, private toastr: ToastrService,
      private tiposervicoService:TipoServicoService) {}

    tiposervicoList:TipoServico;

    ngOnInit() {
      this.tiposervicoService.getTipoServicos().subscribe(res => this.tiposervicoList=res);
    }
}
