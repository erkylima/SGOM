import { Router } from '@angular/router';
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
      private router: Router,
      private renderer: Renderer2,
      private toastr: ToastrService,
      private carroService: CarroService
    ) {}

    carroList: Carro;

    ngOnInit() {
        this.carroService.getCarros().subscribe((res) => {
            this.carroList = res;
        });
    }

    delete(id:string){
      this.carroService.delete(id).subscribe(
        (data) => {
          this.toastr.error("Apagando carro");
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
