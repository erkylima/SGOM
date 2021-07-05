import {EmpresaService} from './../blank/empresa.service';
import {Carro} from './../carro/carro.model';
import {CarroService} from './../carro/carro.service';
import {Component, OnInit} from '@angular/core';
import {ThrowStmt} from '@angular/compiler';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    constructor(
        private carroService: CarroService,
        private empresaService: EmpresaService
    ) {}
    ncarros: any;
    nempresas: any;

    role = localStorage.getItem('role');

    roleAdmin() {
        return this.role == 'ROLE_ADMIN';
    }
    roleUser() {
        return this.role == 'ROLE_USER';
    }
    roleOficina() {
        return this.role == 'ROLE_OFICINA';
    }

    ngOnInit() {
        this.carroService.getCarros().subscribe((res) => {
            this.ncarros = res;
        });

        this.empresaService.getEmpresas().subscribe((res) => {
            this.nempresas = res;
        });
    }
}
