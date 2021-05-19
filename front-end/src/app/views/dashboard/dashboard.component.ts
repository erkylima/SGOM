import { EmpresaService } from './../blank/empresa.service';
import { Carro } from './../carro/carro.model';
import { CarroService } from './../carro/carro.service';
import {Component, OnInit} from '@angular/core';
import { ThrowStmt } from '@angular/compiler';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    constructor(private carroService:CarroService, private empresaService:EmpresaService,) {}
    ncarros:any;
    nempresas:any;
    ngOnInit() {
      this.carroService.getCarros().subscribe((res) => {
        this.ncarros = res;
      });

      this.empresaService.getEmpresas().subscribe((res)=>{
        this.nempresas = res;
      });

    }
}
