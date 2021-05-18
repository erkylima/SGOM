import { Carro } from './../carro.model';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { CarroService } from '../carro.service';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-carro',
  templateUrl: './edit-carro.component.html',
  styleUrls: ['./edit-carro.component.scss']
})
export class EditCarroComponent implements OnInit {

  public editCarroForm: FormGroup;
  public isAuthLoading = false;
  id:string;
  carro:Carro;

  constructor(
    private renderer: Renderer2,
    private toastr: ToastrService,
    private carroService: CarroService,
    private route: ActivatedRoute
) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    this.carroService.getCarroFunction(this.id).subscribe(res=>{

      this.carro = new Carro(res.id,res.empresa,res.modelo, res.placa, res.ano, res.marca);
    }
    );
    this.editCarroForm = new FormGroup({
      id: new FormControl(null),
    nome: new FormControl(null, Validators.required),
    cnpj: new FormControl(null, Validators.required)
  });
  }

  update() {
    if (this.editCarroForm.valid) {
        this.isAuthLoading = true;
        this.editCarroForm.value.id=this.id;
        this.carroService.update(this.editCarroForm.value);
        this.isAuthLoading = false;
    } else {
        this.toastr.error('Algo deu errado!', 'Por favor, tente novamente!');
    }
}


}
