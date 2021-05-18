import { ToastrService } from 'ngx-toastr';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { CarroService } from '../carro.service';
import { Carro } from './../carro.model';
import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-create-carro',
  templateUrl: './create-carro.component.html',
  styleUrls: ['./create-carro.component.scss']
})
export class CreateCarroComponent implements OnInit {

  public criarCarroForm: FormGroup;
  public isAuthLoading = false;

  constructor(
    private renderer: Renderer2,
    private toastr: ToastrService,
    private carroService: CarroService
) { }

  ngOnInit(): void {
    this.criarCarroForm = new FormGroup({
      nome: new FormControl(null, Validators.required),
      cnpj: new FormControl(null, Validators.required)
  });
  }

  save() {
    if (this.criarCarroForm.valid) {
        this.isAuthLoading = true;
        this.carroService.adicionarEditarCarro(this.criarCarroForm.value);
        this.isAuthLoading = false;
    } else {
        this.toastr.error('Algo deu errado!', 'Por favor, tente novamente!');
    }
}


}
