import { ToastrService } from 'ngx-toastr';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { EmpresaService } from './../empresa.service';
import { Empresa } from './../empresa.model';
import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-create-empresa',
  templateUrl: './create-empresa.component.html',
  styleUrls: ['./create-empresa.component.scss']
})
export class CreateEmpresaComponent implements OnInit {

  public criarEmpresaForm: FormGroup;
  public isAuthLoading = false;

  constructor(
    private renderer: Renderer2,
    private toastr: ToastrService,
    private empresaService: EmpresaService
) { }

  ngOnInit(): void {
    this.criarEmpresaForm = new FormGroup({
      nome: new FormControl(null, Validators.required),
      cnpj: new FormControl(null, Validators.required)
  });
  }

  save() {
    if (this.criarEmpresaForm.valid) {
        this.isAuthLoading = true;
        this.empresaService.adicionarEditarEmpresa(this.criarEmpresaForm.value);
        this.isAuthLoading = false;
    } else {
        this.toastr.error('Algo deu errado!', 'Por favor, tente novamente!');
    }
}


}
