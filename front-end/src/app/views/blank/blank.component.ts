import { ToastrService } from 'ngx-toastr';
import { Empresa } from './empresa.model';
import { EmpresaService } from './empresa.service';
import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
    selector: 'app-blank',
    templateUrl: './blank.component.html',
    styleUrls: ['./blank.component.scss']
})
export class BlankComponent implements OnInit {
    constructor(private renderer: Renderer2, private toastr: ToastrService,
      private empresaService:EmpresaService) {}

    empresaList:Empresa;

    ngOnInit() {
      this.empresaService.getEmpresas().subscribe(res => this.empresaList=res);
    }
}
