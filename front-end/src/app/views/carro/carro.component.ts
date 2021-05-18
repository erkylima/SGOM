import {ToastrService} from 'ngx-toastr';
import {Carro} from './carro.model';
import {CarroService} from './carro.service';
import {Component, OnInit, Renderer2} from '@angular/core';

@Component({
    selector: 'app-carro',
    templateUrl: './carro.component.html',
    styleUrls: ['./carro.component.scss']
})
export class CarroComponent implements OnInit {
    constructor(
        private renderer: Renderer2,
        private toastr: ToastrService,
        private carroService: CarroService
    ) {}

    carroList: Carro;

    ngOnInit() {
        this.carroService.getCarros().subscribe((res) => {
            this.carroList = res;
            console.log(res);
        });
    }
}
